import { cyan, red, yellow, green, gray, white } from "colors";
import { padStart } from "lodash";

import { Args } from "./args/args";

const padTimeUnit = (unit: number) => padStart(unit.toString(), 2, "0");
export class Logger {

	constructor(
		private scope?: string
	) {
	}

	info(message: string) {
		console.info(white(this.formatMessage(null, message)));
	}

	debug(method: string, message: string) {
		if (!Args.env.debug) {
			return;
		}

		console.log(green(this.formatMessage(method, message)));
	}

	warn(message: string) {
		console.warn(yellow(this.formatMessage(null, message)));
	}

	error(message?: string, error?: Error) {
		console.error(red(this.formatMessage(null, this.formatErrorMessage(message, error))));
	}

	private formatMessage(method: string | null, message: string): string {
		const date = new Date();
		const time = gray(`${padTimeUnit(date.getHours())}:${padTimeUnit(date.getMinutes())}:${padTimeUnit(date.getSeconds())}`);

		return `${white(`[${time}]`)} ${cyan(`${this.scope}:`)}${method ? ` ${method}` : ""} ${message}`;
	}

	private formatErrorMessage(message?: string, error?: Error): string {
		if (error) {
			const errorMsg = error.message ? error.message : JSON.stringify(error);
			return `Error: ${message ? `${message}, ${errorMsg}` : errorMsg}`;
		}

		return `Error: ${message}`;
	}

}