import * as  _ from "lodash";
import * as yargs from "yargs";

import { Arguments, ArgumentOptions } from "./args.model";
export namespace Args {

	if (process.env.npm_config_argv) {
		yargs.parse(_.uniq([
			...JSON.parse(process.env.npm_config_argv).original,
			...process.argv
		]));
	}

	set([{
		key: "debug",
		description: "Show debug information",
		boolean: true
	}]);

	/**
	 * Register command arguments. When `default` value is specified the argument `type` will be inferred.
	 * @export
	 * @param {ArgumentOptions[]} args
	 * @returns {yargs.Argv}
	 */
	export function set(args: ArgumentOptions[]): yargs.Argv {
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

		return yargs;
	}

	export const getAll = <T extends Arguments>() => yargs.argv as T;
	export const env = Args.getAll();

}