import * as _ from "lodash";

import { getConfigFilePath, ArgumentOptions } from "../../utils";
import { LintTsOptions, LINT_TS_FORMATTERS } from "./lint-ts.model";

export const ARGS: ArgumentOptions<LintTsOptions>[] = [
	{
		key: "config",
		alias: "c",
		description: "Lint rules file path",
		default: getConfigFilePath("tslint.json")
	},
	{
		key: "files",
		alias: "f",
		description: "An array or string of globs to lint",
		default: "./src/**/*.ts",
		array: true
	},
	{
		key: "formatter",
		description: "The formatter to use to format the results of the linter",
		default: LINT_TS_FORMATTERS.stylish,
		choices: _.keysIn(LINT_TS_FORMATTERS)
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