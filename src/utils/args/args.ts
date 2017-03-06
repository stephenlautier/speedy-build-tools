import * as  _ from "lodash";
import * as yargs from "yargs";

import { Arguments } from "./args.model";
export namespace Args {

	if (process.env.npm_config_argv) {
		yargs.parse(_.uniq([
			...JSON.parse(process.env.npm_config_argv).original,
			...process.argv
		]));
	}

	yargs.global("debug");
	setBoolean("debug", false);

	export function setArray<T>(key: string, values: T[], defaultValue?: T, alias?: string) {
		set<T>(key, defaultValue, alias);

		if (values) {
			yargs.choices(key, values);
		}

		yargs.array(key);
	}

	export function setBoolean(key: string, defaultValue?: boolean, alias?: string) {
		set<boolean>(key, defaultValue, alias);
		yargs.boolean(key);
	}

	export function setNumber(key: string, defaultValue?: number, alias?: string) {
		set<number>(key, defaultValue, alias);
		yargs.number(key);
	}

	export function set<T>(key: string, defaultValue?: T, alias?: string) {
		if (alias) {
			yargs.alias(key, alias);
		}

		if (!_.isNil(defaultValue)) {
			yargs.default(key, defaultValue);
		}
	}

	export const getAll = <T extends Arguments>() => yargs.argv as T;
	export const env = Args.getAll();

}