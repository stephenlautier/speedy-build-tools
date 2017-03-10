import * as _ from "lodash";
import { readFile, statSync } from "fs";
import { IOptions, sync } from "fast-glob";
import { join, sep, normalize, isAbsolute } from "path";

let rootPath: string | null;
export function getRootPath(): string {
	if (!_.isNil(rootPath)) {
		return rootPath;
	}

	rootPath = findRoot();
	if (!rootPath) {
		rootPath = "";
	}

	return rootPath;
}

export function readFileAsync(path: string): Promise<string> {
	return new Promise((resolve, reject) => {
		readFile(path, "utf-8", (error, data) => {
			if (error) {
				return reject(error);
			}

			return resolve(data);
		});
	});
}

export async function readJsonFileAsync<T>(path: string): Promise<T> {
	return JSON.parse(await readFileAsync(path));
}

export function globArray(patterns: string[], options?: IOptions): string[] {
	let fileMatches: string[] = [];
	const amendedOptions = { cwd: getRootPath(), ...options } as IOptions;

	for (let pattern of patterns) {
		const patternMatches = sync(pattern, amendedOptions);
		fileMatches = pattern.startsWith("!") ? _.pullAll(fileMatches, patternMatches) : [...fileMatches, ...patternMatches];
	}

	return fileMatches.map(x => join(getRootPath(), x));
}

export function toArray<T>(pattern: T | T[]): T[] {
	if (!_.isArray(pattern)) {
		return [pattern];
	}

	return pattern;
}

export function findRoot(fileName?: string, filePath?: string): string | null {
	filePath = normalize(filePath || rootPath || process.cwd());

	try {
		const directory = join(filePath, sep);
		statSync(join(directory, fileName ? fileName : "package.json"));
		return directory;
	} catch (e) {
		// do nothing
	}

	let position = _.lastIndexOf(filePath, sep);
	if (position < 0) {
		return null;
	}

	const truncatedPath = filePath.substr(0, position++);
	return findRoot(fileName, truncatedPath);
}

export function getConfigFilePath(filePath: string): string {
	if (isAbsolute(filePath)) {
		return filePath;
	}

	let path = findRoot(filePath);

	if (!path) {
		path = join(__dirname, "../../");
	}

	return join(path, filePath);
}