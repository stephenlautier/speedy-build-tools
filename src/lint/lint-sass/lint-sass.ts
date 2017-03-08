import * as _ from "lodash";
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
	getConfigFilePath,
	mergeArgsWithOptions,
	ArgumentOptions,
	globArray,
	toArray,
	readJsonFileAsync,
	readFileAsync
} from "../../utils";

import { LintSassOptions, LINT_SASS_FORMATTERS } from "./lint-sass.model";

const logger = new Logger("Lint SASS");
const timer = new Timer(logger);

const ARGS: ArgumentOptions<LintSassOptions>[] = [
	{
		key: "config",
		alias: "c",
		description: "Lint rules file path",
		default: getConfigFilePath(".stylelintrc")
	},
	{
		key: "files",
		alias: "f",
		description: "An array or string of globs to lint",
		default: "./src/**/*.*(scss|sass)",
		array: true
	},
	{
		key: "formatter",
		description: "The formatter to use to format the results of the linter",
		default: LINT_SASS_FORMATTERS.verbose,
		choices: _.keysIn(LINT_SASS_FORMATTERS)
	},
	{
		key: "fix",
		description: "Automatically fix some linting issues",
		default: false
	},
	{
		key: "continueOnError",
		description: "Don't exit with a non-zero status code on lint errors",
		default: false
	}
];

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

export const lintSassModule: CommandModule = {
	command: "lint-sass",
	describe: "Lint Sass files",
	handler: lintSass,
	builder: () => Args.set(ARGS)
};