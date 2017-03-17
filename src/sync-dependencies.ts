import { join } from "path";
import { writeFile } from "fs";

import { Timer, Logger, Dictionary } from "./utils";

const logger = new Logger("Dependencies");
const timer = new Timer(logger);

export function syncDependencies(sourceSection = "baseDependencies", targetSection = "devDependencies"): Promise<any> {
	return new Promise((resolve, reject) => {
		try {
			timer.start();

			const jsonPath = "../../package.json";
			const packageJson = require(jsonPath);
			const newPackageJsonContent = packageJson;

			logger.info(`Attempting to sync ${sourceSection} => ${targetSection}`);

			const syncDependencies = getSyncDependencies(sourceSection);
			const mergedDependencies = { ...newPackageJsonContent[targetSection], ...syncDependencies };
			newPackageJsonContent[targetSection] = sortedObject(mergedDependencies);

			delete newPackageJsonContent[sourceSection];
			writeJsonFile(newPackageJsonContent, jsonPath);

			resolve();
			timer.finish();

		} catch (error) {
			reject(error);
		}
	});
}

function sortedObject(input: Dictionary<string>): Dictionary<string> {
	const output: Dictionary<string> = {};

	Object.keys(input)
		.sort()
		.forEach(key => output[key] = input[key]);

	return output;
};

function getSyncDependencies(section: string): Dictionary<string> | null {
	const packageJson = require(join(__dirname, "../../package.json"));

	if (!packageJson) {
		return null;
	}

	return packageJson[section];
}

function writeJsonFile(jsonContent: string, jsonPath: string) {
	writeFile(jsonPath, JSON.stringify(jsonContent, null, 2) + "\n", "utf8", error => {
		if (error) {
			logger.error(error.message);
			return;
		}

		logger.info(`Package.json synced successfully!`);
	});
}