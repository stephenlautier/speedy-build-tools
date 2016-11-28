import * as path from "path";
import * as fs from "fs";
import { cyan, red } from "colors";

type Dictionary<T> = { [key: string]: T };

export function syncDependencies(packageJsonDirPath: string, sourceSection: string, targetSection: string) {
	const packageJsonPath = require("../../package.json");
	const newPackageJsonContent = require(packageJsonPath);

	console.log(cyan(`Attempting to sync ${sourceSection} => ${targetSection}`));

	const syncDependencies = getSyncDependencies(sourceSection);
	const mergedDependencies = Object.assign({}, newPackageJsonContent[targetSection], syncDependencies);
	newPackageJsonContent[targetSection] = sortedObject(mergedDependencies);

	writeJsonFile(newPackageJsonContent, path.join(packageJsonPath));
}

function sortedObject(input: Dictionary<any>): Dictionary<any> {
	const output: Dictionary<any> = {};

	Object.keys(input).sort().forEach(function (key) {
		output[key] = input[key];
	});

	return output;
};

function getSyncDependencies(section: string) {
	const packageJsonPath = path.join(__dirname, "../../package.json");
	const packageJson = require(packageJsonPath);

	if (!packageJson) {
		return null;
	}

	return packageJson[section];
}

function writeJsonFile(jsonContent: string, jsonPath: string) {
	fs.writeFile(jsonPath, JSON.stringify(jsonContent, null, 2) + "\n", "utf8", error => {
		if (error) {
			console.log(red(error.message));
			return;
		}
		console.log(cyan(`Package.json synced successfully!`));
	});
}