import * as  _ from "lodash";
import * as yargs from "yargs";
import * as yargsParser from "yargs-parser";

import { Arguments, ArgumentOptions } from "./args.model";

export namespace Args {

	const ARGS_REQUIRED_FLAGS = ["require", "required", "demand"];

	yargs.parse(mergedConfigArgsAndProcessArgv());

	set<Arguments>([{
		key: "debug",
		description: "Show debug information",
		boolean: true
	}]);

	/**
	 * Register command arguments. When `default` value is specified the argument `type` will be inferred.
	 * @export
	 * @template T
	 * @param {ArgumentOptions<T>[]} args
	 * @returns {yargs.Argv}
	 */
	export function set<T>(args: ArgumentOptions<T>[]): T {
		for (let x of args) {
			yargs.option(x.key, x);

			if (_.isNil(x.default) || x.boolean || x.type || x.number || x.array || x.string) {
				continue;
			}

			if (_.isNumber(x.default)) {
				yargs.number(x.key);
			}

			if (_.isBoolean(x.default)) {
				yargs.boolean(x.key);
			}

			if (_.isString(x.default)) {
				yargs.string(x.key);
			}

			if (_.isArray(x.default)) {
				yargs.array(x.key);
			}
		}

		return yargs.argv;
	}

	/**
	 * Merges `process.env.npm_config_argv` with `process.argv` and remove duplicate arguments
	 *
	 * @export
	 * @returns {string[]}
	 */
	export function mergedConfigArgsAndProcessArgv(): string[] {
		if (process.env.npm_config_argv) {
			const parsedArgv = yargsParser.detailed(process.argv).argv;
			const parsedConfigArgv = yargsParser.detailed(JSON.parse(process.env.npm_config_argv).original).argv;
			const mergedArgv = { ...parsedArgv, ...parsedConfigArgv };
			const convertedArgs: any[] = parsedArgv._;

			_.forEach(mergedArgv, (value, key) => {
				if (key === "_") {
					return;
				};

				convertedArgs.push(`--${key}`, value);
			});

			return convertedArgs;
		}

		return process.argv;
	}

	/**
	 * Merges `Default Arguments` object with process `Arguments` and `Options`
	 *
	 * @export
	 * @returns {string[]}
	 */
	export function mergeWithOptions<T extends Partial<Arguments>>(defaultArgs: ArgumentOptions<T>[], options?: Partial<T>): T {
		// if this has been called it means that the CLI was called and required 'args' have been passed.
		// thus the required flags are not required anymore. Or it's from the API which we need to handle else where.
		const args = defaultArgs.map(x => _.omit<ArgumentOptions<T>, ArgumentOptions<T>>(x, ARGS_REQUIRED_FLAGS));

		// todo: add generic type when issue is solved
		// https://github.com/Microsoft/TypeScript/issues/10727
		return Object.assign({}, Args.set(args), options);
	}

	export const getAll = <T extends Arguments>() => yargs.argv as T;
	export const env = Args.getAll();

}