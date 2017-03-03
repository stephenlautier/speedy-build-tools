import * as glob from "glob";
import * as mockFs from "mock-fs";
import { normalize } from "path";
import { toArray, globArray, findRoot, readFileAsync, readJsonFileAsync } from "./utils";

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

		it("must reject promise when file is not found", done => {
			readFileAsync("invalid.txt").catch(x => {
				expect(x).toBeDefined();
				done();
			});
		});

		it("must return file content when file exists", done => {
			readFileAsync("file.txt").then(x => {
				expect(x).toBe("hello world");
				done();
			});
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

		it("must reject promise when file is not found", done => {
			readJsonFileAsync("invalid.json").catch(x => {
				expect(x).toBeDefined();
				done();
			});
		});

		it("must return file content as object when file exists", done => {
			readJsonFileAsync("file.json").then(x => {
				expect(x).toEqual(json);
				done();
			});
		});
	});

	describe("toArray", () => {
		it("must convert value to array", () => {
			const value = "hello world";
			expect(toArray(value)).toEqual([value]);
		});
	});

	describe("globArray", () => {
		const files = ["test.ts", "test2.ts"];
		const specFiles = ["test.spec.ts", "test2.spec.ts"];
		const allFiles = [...files, ...specFiles];

		beforeEach(() => {
			spyOn(glob, "sync").and.returnValues(allFiles, specFiles);
		});

		it("must return files matching pattern", () => {
			expect(globArray(["*.ts"])).toEqual(allFiles);
		});

		it("must return files excluding negative pattern", () => {
			expect(globArray(["*.ts", "!*.spec.ts"])).toEqual(files);
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