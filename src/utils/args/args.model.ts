import * as yargs from "yargs";

export interface Arguments {
	debug: boolean;
}
export interface ArgumentOptions extends yargs.Options {
	key: string;
}