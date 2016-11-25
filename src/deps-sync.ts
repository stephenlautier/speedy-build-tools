import * as path from "path";
import * as fs from "fs";
import { cyan, red } from "colors";
const sortedObject = require("sorted-object");

type Dictionary<T> = { [key: string]: T };

export function syncDependencies(packageJsonDirPath: string, sourceSection: string, targetSection: string) {
	const packageJsonPath = path.join(packageJsonDirPath, "package.json");
	const newPackageJsonContent = require(packageJsonPath);

	console.log(cyan(`Attempting to sync ${sourceSection} => ${targetSection}`));

	const syncDependencies = getSyncDependencies(sourceSection);
	const mergedDependencies = Object.assign({}, newPackageJsonContent[targetSection], syncDependencies);
	newPackageJsonContent[targetSection] = sortedObject(mergedDependencies);

	if (writeJsonFile(newPackageJsonContent, path.join(packageJsonPath))) {
		console.log(cyan(`Package.json synced successfully!`));
	}
}

function getSyncDependencies(section: string) {
	const packageJsonPath = path.join(__dirname, "../../package.json");
	const packageJson = require(packageJsonPath);

	if (!packageJson) {
		return null;
	}

	return packageJson[section];
}

function writeJsonFile(jsonContent: string, jsonPath: string): boolean {
	fs.writeFile(jsonPath, JSON.stringify(jsonContent, null, 2) + "\n", "utf8", error => {
		if (error) {
			console.log(red(error.message));
		}
	});
	return true;
}