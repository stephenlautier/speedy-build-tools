import { join } from "path";
import { writeFile } from "fs";
import { cyan, red } from "colors";

type Dictionary<T> = { [key: string]: T };
type Nullable<T> = T | null;

export function syncDependencies(sourceSection = "baseDependencies", targetSection = "devDependencies"): Promise<any> {
	return new Promise((resolve, reject) => {
		try {
			const jsonPath = "../../package.json";
			const packageJson = require(jsonPath);
			const newPackageJsonContent = packageJson;

			console.log(cyan(`Attempting to sync ${sourceSection} => ${targetSection}`));

			const syncDependencies = getSyncDependencies(sourceSection);
			const mergedDependencies = Object.assign({}, newPackageJsonContent[targetSection], syncDependencies);
			newPackageJsonContent[targetSection] = sortedObject(mergedDependencies);

			delete newPackageJsonContent[sourceSection];
			writeJsonFile(newPackageJsonContent, jsonPath);

			resolve();

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

function getSyncDependencies(section: string): Nullable<Dictionary<string>> {
	const packageJsonPath = join(__dirname, "../../package.json");
	const packageJson = require(packageJsonPath);

	if (!packageJson) {
		return null;
	}

	return packageJson[section];
}

function writeJsonFile(jsonContent: string, jsonPath: string) {
	writeFile(jsonPath, JSON.stringify(jsonContent, null, 2) + "\n", "utf8", error => {
		if (error) {
			console.log(red(error.message));
			return;
		}
		console.log(cyan(`Package.json synced successfully!`));
	});
}