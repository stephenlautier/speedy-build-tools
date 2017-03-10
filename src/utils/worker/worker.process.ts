import { Logger } from "../logger";
import { WorkerMessage } from "./worker.model";

const logger = new Logger("Worker Process");

process.on("message", async (message: WorkerMessage) => {
	try {
		const task = require(message.modulePath)[message.task] as (...params: any[]) => Promise<any>;
		const result = await task.apply(null, message.parameters) as Promise<any>;

		sendMessage(message, { resolved: result });
	} catch (error) {
		logger.error("onMessage", error);
		sendMessage(message, {
			error: {
				message: error.message,
				name: error.name,
				stack: error.stack
			}
		});
		process.exit(1);
	}
});

function sendMessage(message: WorkerMessage, messageOverrides: Partial<WorkerMessage>) {
	logger.debug("sendMessage", `task: ${message.task}, pid: ${process.pid}`);
	process.send!({ ...message, ...messageOverrides });
}