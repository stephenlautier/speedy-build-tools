import { cyan, red, yellow, green, gray, white } from "colors";
import { padStart } from "lodash";

export class Logger {

	constructor(
		private scope?: string
	) {
	}

	log(message: string) {
		console.log(white(this.getFullMessage(message)));
	}

	debug(message: string) {
		// todo: this should be printed only when env is debug mode.
		console.log(green(this.getFullMessage(message)));
	}

	warn(message: string) {
		console.log(yellow(this.getFullMessage(message)));
	}

	error(message: string, error?: Error) {
		console.error(red(this.getFullMessage(error ? `${message}, error: ${error}` : message)));
	}

	private getFullMessage(message: string): string {
		const date = new Date();
		const time = `${this.padTime(date.getHours())}:${this.padTime(date.getMinutes())}:${this.padTime(date.getSeconds())}`;
		const taskName = `${this.scope!}:`;

		return `[${gray(time)}] ${cyan(taskName)} ${message}`;
	}

	private padTime(timeUnit: number): string {
		return padStart(timeUnit.toString(), 2, "0");
	}

}