import * as stylefmt from "stylefmt";
import * as postcss from "postcss";
import { CommandModule } from "yargs";
import { writeFileSync } from "fs";
import { lint, LinterResult, formatters, LinterOptions } from "stylelint";

import {
	Logger,
	Worker,
	Timer,
	Args,
	mergeArgsWithOptions,
	globArray,
	toArray,
	readJsonFileAsync,
	readFileAsync
} from "../../utils";

import { LintSassOptions } from "./lint-sass.model";
import { ARGS } from "./lint-sass.args";

const logger = new Logger("Lint SASS");
const timer = new Timer(logger);

export async function lintSass(options?: LintSassOptions): Promise<LinterResult[]> {
	timer.start();

	try {
		return await Worker.run<LinterResult[]>(__filename, handleLintSass.name, options);
	} catch (error) {
		logger.error("", error);
		throw error;
	} finally {
		timer.finish();
	}
}

/** @internal */
export async function handleLintSass(options: LintSassOptions): Promise<LinterResult[]> {
	try {
		const mergedOptions = mergeArgsWithOptions(ARGS, options);
		const configData = await readJsonFileAsync<JSON>(mergedOptions.config!);

		const failures = (
			await Promise.all(
				globArray(toArray(mergedOptions.files!)).map(x => lintFile(x, configData, mergedOptions))
			)
		)
			.filter(x => x.errored);

		failures.forEach(x => logger.info(formatters.string(x.results)));

		if (failures.length && !mergedOptions.continueOnError) {
			process.exit(1);
		}

		return failures;

	} catch (error) {
		throw error;
	}
}

async function lintFile(filePath: string, configData: JSON, options: LintSassOptions): Promise<LinterResult> {
	try {
		const fileContent = await readFileAsync(filePath);

		const lintOptions: LinterOptions = {
			config: configData,
			codeFilename: filePath,
			formatter: options.formatter,
			code: fileContent
		};

		const lintResult = await lint(lintOptions);

		if (!lintResult.errored || (lintResult.errored && !options.fix)) {
			return lintResult;
		}

		// let's try to fix lint issues
		const result = await postcss([
			stylefmt({ configFile: options.config })
		]).process(fileContent, {
			from: filePath
		});

		const fixedFilesContent = result.css;

		if (fixedFilesContent === fileContent) {
			logger.debug("lintFile", `Cannot fix lint issues, file: ${filePath}`);
			return lintResult;
		}

		logger.debug("lintFile", `Fixed some lint issues, file: ${filePath}`);
		writeFileSync(filePath, fixedFilesContent);

		lintOptions.code = fixedFilesContent;
		return await lint(lintOptions);
	} catch (error) {
		logger.debug("lintFile", error);
		throw error;
	}
}

/** @internal */
export const lintSassModule: CommandModule = {
	command: "lint-sass",
	describe: "Lint Sass files",
	handler: lintSass,
	builder: () => Args.set(ARGS)
};