import { join } from "path";
import { writeFile } from "fs";

import { Logger } from "./utils/logger";

type Dictionary<T> = { [key: string]: T };

const logger = new Logger("Sync Dependencies");

export function syncDependencies(sourceSection = "baseDependencies", targetSection = "devDependencies"): Promise<any> {
	return new Promise((resolve, reject) => {
		try {
			logger.start();

			const jsonPath = "../../package.json";
			const packageJson = require(jsonPath);
			const newPackageJsonContent = packageJson;

			logger.log(`Attempting to sync ${sourceSection} => ${targetSection}`);

			const syncDependencies = getSyncDependencies(sourceSection);
			const mergedDependencies = Object.assign({}, newPackageJsonContent[targetSection], syncDependencies);
			newPackageJsonContent[targetSection] = sortedObject(mergedDependencies);

			delete newPackageJsonContent[sourceSection];
			writeJsonFile(newPackageJsonContent, jsonPath);

			resolve();
			logger.finish();

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

		logger.log(`Package.json synced successfully!`);
	});
}