// Type definitions for Stylelint 7.9
// Project: https://github.com/stylelint/stylelint
// Definitions by: Alan Agius <https://github.com/alan-agius4/>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare namespace stylelint {

	interface LinterOptions {
		code?: string;
		codeFilename?: string;
		config?: JSON;
		configBasedir?: string;
		configFile?: string;
		configOverrides?: JSON;
		files?: string | string[];
		formatter?: "json" | "string" | "verbose";
		ignoreDisables?: boolean;
		reportNeedlessDisables?: boolean;
		ignorePath?: boolean;
		syntax?: "scss" | "less" | "sugarss";
		customSyntax?: string;
	}

	interface LinterResult {
		errored: boolean;
		output: string;
		postcssResults: any[];
		results: LintResult[];
	}

	interface LintResult {
		errored: boolean | undefined;
		source: string | undefined
		ignored: boolean | undefined;
		warnings: string[];
		deprecations: string[];
		invalidOptionWarnings: any[];
	}

	namespace formatters {
		function json(results: LintResult[]): string;
		function string(results: LintResult[]): string;
		function verbose(results: LintResult[]): string;
	}

	function lint(options?: LinterOptions): Promise<LinterResult>;
}

declare module "stylelint" {
	export = stylelint;
}