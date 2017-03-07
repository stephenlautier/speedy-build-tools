import * as glob from "glob";
import * as mockFs from "mock-fs";
import { normalize } from "path";

import {
	ArgumentOptions,
	toArray,
	globArray,
	findRoot,
	readFileAsync,
	readJsonFileAsync,
	transformArgsToOptions
} from "./index";

describe("utilsSpec", () => {

	describe("readFileAsync", () => {
		beforeEach(() => {
			mockFs({
				"file.txt": "hello world"
			});
		});

		afterEach(() => {
			mockFs.restore();
		});

		it("must reject promise when file is not found", async done => {
			try {
				await readFileAsync("invalid.txt");
			} catch (error) {
				expect(error).toBeTruthy();
			}

			done();

		});

		it("must return file content when file exists", async done => {
			const x = await readFileAsync("file.txt");
			expect(x).toBe("hello world");
			done();
		});
	});

	describe("readJsonFileAsync", () => {
		const json = {
			"id": 10,
			text: "hello world"
		};

		beforeEach(() => {
			mockFs({
				"file.json": JSON.stringify(json)
			});
		});

		afterEach(() => {
			mockFs.restore();
		});

		it("must reject promise when file is not found", async done => {
			try {
				await readJsonFileAsync("invalid.json");
			} catch (error) {
				expect(error).toBeTruthy();
			}

			done();
		});

		it("must return file content as object when file exists", async done => {
			const x = await readJsonFileAsync("file.json");
			expect(x).toEqual(json);
			done();
		});
	});

	describe("toArray", () => {
		it("must convert value to array", () => {
			const value = "hello world";
			expect(toArray(value)).toEqual([value]);
		});
	});

	describe("globArray", () => {
		const srcFiles = ["test.ts", "test2.ts"];
		const specFiles = ["test.spec.ts", "test2.spec.ts"];
		const allFiles = [...srcFiles, ...specFiles];

		beforeEach(() => {
			spyOn(glob, "sync").and.returnValues(allFiles, specFiles);
		});

		it("must return files matching pattern", () => {
			expect(globArray(["*.ts"])).toEqual(allFiles);
		});

		it("must return files excluding negative pattern", () => {
			expect(globArray(["*.ts", "!*.spec.ts"])).toEqual(srcFiles);
		});
	});

	describe("transformArgsToOptions", () => {
		const args: ArgumentOptions[] = [
			{
				key: "watch",
				default: true,
				description: ""
			},
			{
				key: "files",
				default: "**/**.ts",
				description: ""
			}
		];

		it("must return transformed args to default options object", () => {
			expect(transformArgsToOptions(args)).toEqual({
				watch: true,
				files: "**/**.ts"
			});
		});
	});

	describe("findRoot", () => {
		beforeEach(() => {
			mockFs({
				"src/apps/": {
					"empty-dir": {}
				},
				"src/package.json": ""
			});
		});

		afterEach(() => {
			mockFs.restore();
		});

		it("must return the correct path to package.json", () => {
			expect(findRoot("package.json", "src/apps/")).toEqual(normalize("src/"));
		});

		it("must return the null when package.json doesn't exist", () => {
			expect(findRoot("package.json", "invalid/path")).toEqual(null);
		});
	});
});