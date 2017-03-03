import { readFile, statSync } from "fs";
import { IOptions, sync } from "glob";
import { pullAll, isArray, lastIndexOf } from "lodash";
import { join, sep, normalize } from "path";

import { Args } from "./args/args";
import { Arguments } from "./args/args.model";

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

export function globArray(patterns: string[], options: IOptions = {}): string[] {
	let fileMatches: string[] = [];

	for (let pattern of patterns) {
		const patternMatches = sync(pattern, options);
		fileMatches = pattern.startsWith("!") ? pullAll(fileMatches, patternMatches) : [...fileMatches, ...patternMatches];
	}

	return fileMatches;
}

export function toArray<T>(pattern: T | T[]): T[] {
	if (!isArray(pattern)) {
		return [pattern];
	}

	return pattern;
}

export function findRoot(fileName?: string, filePath?: string): string | null {
	filePath = normalize(filePath || process.cwd());

	try {
		const directory = join(filePath, sep);
		statSync(join(directory, fileName ? fileName : "package.json"));
		return directory;
	} catch (e) {
		// do nothing
	}

	let position = lastIndexOf(filePath, sep);
	if (position < 0) {
		return null;
	}

	const truncatedPath = filePath.substr(0, position++);
	return findRoot(fileName, truncatedPath);
}

export function getConfigFilePath(fileName: string): string {
	let filePath = findRoot(fileName);

	if (!filePath) {
		filePath = join(__dirname, "../../");
	}

	return join(filePath, fileName);
}

export function mergeArgsWithOptions<T extends Partial<Arguments>>(defaultOptions: T, options: T | undefined): T {
	// todo: add generic type when issue is solved
	// https://github.com/Microsoft/TypeScript/issues/10727
	return Object.assign({}, defaultOptions, Args.getAll(), options);
};