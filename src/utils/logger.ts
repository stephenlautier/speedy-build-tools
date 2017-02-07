import { cyan, red, yellow, green } from "colors";

export class Logger {

	private startTime: number;

	constructor(
		private task?: string
	) {
	}

	start() {
		this.startTime = Date.now();
		this.log(`${this.task} started ...`);
	}

	log(message: string) {
		console.log(cyan(message));
	}

	debug(message: string) {
		console.log(green(message));
	}

	warn(message: string) {
		console.warn(yellow(message));
	}

	error(message: string, error?: Error) {
		console.error(red(error ? `${message}, error: ${error}` : message));
	}

	finish() {
		const duration = Date.now() - this.startTime;
		const time = duration > 1000 ?
			`${(duration / 1000).toFixed(2)} s` :
			`${duration.toFixed(3)} ms`;

		this.log(`${this.task} finished in ${time}`);
	}

}

export const logger = new Logger();
