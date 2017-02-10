import { fork, ChildProcess } from "child_process";
import { join } from "path";
import { findIndex } from "lodash";

import { Logger } from "../logger";
import { WorkerProcess, WorkerMessage } from "./worker.model";

const logger = new Logger("Worker Client");

export namespace Worker {
	const workers: WorkerProcess[] = [];

	export function run(modulePath: string, task: string, parameters?: any): Promise<{}> {
		return new Promise((resolve, reject) => {
			const worker = create(task);

			if (!worker) {
				return;
			}

			worker
				.on("message", (message: WorkerMessage) => {
					const failure = message.error || message.reject;

					if (failure) {
						reject(failure);
					} else {
						resolve(message.resolve);
					}

					kill(worker.pid!);
				})
				.on("error", error => logger.error(`task: ${task}, pid: ${worker.pid}`, error))
				.on("exit", () => logger.debug(`Exited, task: ${task}, pid: ${worker.pid}`))
				.send({
					task: task,
					modulePath: modulePath,
					parameters: parameters
				} as WorkerMessage);
		});
	}

	function create(task: string): ChildProcess | null {
		try {
			const childProcess = fork(join(__dirname, "worker.process.js"), process.env.argv);

			workers.push({
				task: task,
				process: childProcess
			});

			logger.debug(`Succesfully created task: ${task}, pid: ${childProcess.pid}`);

			return childProcess;
		} catch (error) {
			logger.error(`Unable to 'create' worker task: ${task}`, error);
		}

		return null;
	}

	function kill(pid: Number) {
		const workerIndex = findIndex(workers, x => pid === (x && x.process.pid));

		if (workerIndex < 0) {
			return;
		}

		const worker = workers[workerIndex];

		try {
			worker.process.kill("SIGTERM");
			logger.debug(`Killed worker task: ${worker.task}, pid: ${pid}`);
		} catch (error) {
			logger.error(`Unable to 'kill' worker task: ${worker.task}, pid: ${pid}`, error);
		} finally {
			delete workers[workerIndex];
		}
	}
}