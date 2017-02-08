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
		const time = gray(`${this.padTime(date.getHours())}:${this.padTime(date.getMinutes())}:${this.padTime(date.getSeconds())}`);
		const taskName = cyan(`${this.scope!}:`);

		return `${white("[" + time + "]")} ${taskName} ${message}`;
	}

	private padTime(timeUnit: number): string {
		return padStart(timeUnit.toString(), 2, "0");
	}

}