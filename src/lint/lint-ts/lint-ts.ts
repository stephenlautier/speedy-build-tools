import { Linter, LintResult, Configuration, ILinterOptions } from "tslint";

import {
	Logger,
	Worker,
	Timer,
	readFileAsync,
	globArray,
	toArray,
	buildCommandModule,
	Args,
	getConfigFilePath
} from "../../utils";

import { LintTsOptions } from "./lint-ts.model";
import { ARGS } from "./lint-ts.args";

const logger = new Logger("Lint TS");

export async function lintTs(options?: LintTsOptions): Promise<LintResult[]> {
	const timer = new Timer(logger);

	try {
		timer.start();
		return await Worker.run<LintResult[]>(__filename, handlelintTs.name, options);
	} catch (error) {
		logger.error("", error);
		throw error;
	} finally {
		timer.finish();
	}
}

/** @internal */
export async function handlelintTs(options: LintTsOptions): Promise<LintResult[]> {
	const mergedOptions = Args.mergeWithOptions(ARGS, options);
	const files = mergedOptions.files!;
	const configData = Configuration.findConfiguration(null, getConfigFilePath(mergedOptions.config!)).results!;

	const failures = (
		await Promise.all(
			globArray(toArray(files)).map(x => lintFile(x, configData, mergedOptions))
		)
	)
		.filter(x => x.failureCount > 0);

	failures.forEach(x => logger.info(x.output));

	if (failures.length && !mergedOptions.continueOnError) {
		process.exit(1);
	}

	return failures;
}

async function lintFile(filePath: string, configData: Configuration.IConfigurationLoadResult, options: LintTsOptions): Promise<LintResult> {
	logger.debug("lintFile", `filePath: ${filePath}`);

	const linter = new Linter(options as ILinterOptions);
	linter.lint(filePath, await readFileAsync(filePath), configData);

	return linter.getResult();
}
/** @internal */
export const lintTsModule = buildCommandModule({
	command: "lint-ts",
	description: "Lint Typescript files",
	handler: lintTs,
	args: ARGS
});