import * as yargs from "yargs";

import { Args } from "./args";

describe("argsSpec", () => {

	describe("mergedConfigArgsAndProcessArgv", () => {
		const processArgs = process.argv;
		const npmConfigArgv = process.env.npm_config_argv;

		beforeAll(() => {
			process.argv = [
				"C:\\Program Files\\nodejs\\node.exe",
				"C:\\git\\node_modules\tasks.js",
				"clean",
				"--config",
				"config-override.txt",
				"--debug",
				"help"
			];

			process.env.npm_config_argv = JSON.stringify({
				original: [
					"run",
					"clean",
					"--config",
					"config.txt"
				]
			});
		});

		afterAll(() => {
			process.argv = processArgs;
			process.env.npm_config_argv = npmConfigArgv;
		});

		it("must merge and override process.env.npm_config_argv with process.args values", () => {
			yargs.parse(Args.mergedConfigArgsAndProcessArgv());

			expect(yargs.argv.config).toBe("config.txt");
			expect(yargs.argv.debug).toBe(true);
		});
	});

});