import { cyan, red, yellow, green, gray, white } from "colors";
import { padStart } from "lodash";

export class Logger {

	constructor(
		private scope?: string
	) {
	}

	log(message: string) {
		console.log(white(this.getTransformedMessage(message)));
	}

	debug(message: string) {
		// todo: this should be printed only when env is debug mode.
		console.log(green(this.getTransformedMessage(message)));
	}

	warn(message: string) {
		console.log(yellow(this.getTransformedMessage(message)));
	}

	error(message: string, error?: Error) {
		console.error(red(this.getTransformedMessage(error ? `${message}, error: ${error}` : message)));
	}

	private getTransformedMessage(message: string): string {
		const date = new Date();
		const time = gray(`${this.padTimeUnit(date.getHours())}:${this.padTimeUnit(date.getMinutes())}:${this.padTimeUnit(date.getSeconds())}`);
		const taskName = cyan(`${this.scope!}:`);

		return `${white("[" + time + "]")} ${taskName} ${message}`;
	}

	private padTimeUnit(unit: number): string {
		return padStart(unit.toString(), 2, "0");
	}

}