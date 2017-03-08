import * as _ from "lodash";

import { getConfigFilePath, ArgumentOptions } from "../../utils";
import { LintSassOptions, LINT_SASS_FORMATTERS } from "./lint-sass.model";

export const ARGS: ArgumentOptions<LintSassOptions>[] = [
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