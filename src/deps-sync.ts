import * as path from "path";
import * as fs from "fs";
const sortedObject = require("sorted-object");

type Dictionary<T> = { [key: string]: T };

export function syncDependencies(packageJsonDirPath: string, sectionMap: Map<string, string>) {
	const packageJsonPath = path.join(packageJsonDirPath, "package.json");
	const newPackageJsonContent = require(packageJsonPath);

	for (let [key, value] of sectionMap) {
		console.log(`Attempting to sync ${key} => ${value}`);

		const syncDependencies = getSyncDependencies(key);
		const mergedDependencies = Object.assign({}, newPackageJsonContent[value], syncDependencies);
		newPackageJsonContent[value] = sortedObject(mergedDependencies);
	}

	if (writeJsonFile(newPackageJsonContent, path.join(packageJsonPath))) {
		console.log(`Package.json synced successfully!`);
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
	fs.writeFile(jsonPath, JSON.stringify(jsonContent, null, 2) + "\n", "utf8", function (err: any) {
		if (err) {
			console.log(err);
		}
	});
	return true;
}