import * as mockFs from "mock-fs";

import { Logger } from "../../utils";
import { handleLintSass } from "./lint-sass";
import { LintSassOptions } from "./lint-sass.model";

describe("lintSassSpec", () => {

	describe("handleLintSass", () => {
		let options: LintSassOptions = {
			continueOnError: true,
			config: ".stylelintrc",
			fix: false
		};

		beforeEach(() => {
			mockFs({
				"src/invalid.scss": "a {color: red}",
				"src/can-fix.scss": "div {width: 10.0em}",
				"src/valid.scss": "a {color: #000}",
				".stylelintrc": `{
					"rules": {
						"color-named": "never",
						"number-no-trailing-zeros": true
					}
				}`
			});

			spyOn(Logger.prototype, "info").and.stub();
			spyOn(Logger.prototype, "debug").and.stub();
		});

		afterEach(() => {
			mockFs.restore();
		});

		it("must return errors when incorrect SASS is present", async done => {
			const result = await handleLintSass({
				...options,
				files: "src/**/*.scss"
			});

			expect(result.length).toBeTruthy();
			done();
		});

		it("must not return errors when SASS is valid", async done => {
			const result = await handleLintSass({
				...options,
				files: "src/valid.scss"
			});

			expect(result.length).toBeFalsy();
			done();
		});

		it("must fix errors when `fix` parameter is set to true", async done => {
			const result = await handleLintSass({
				...options,
				files: "src/can-fix.scss",
				fix: true
			});

			console.log(result);

			expect(result.length).toBeFalsy();
			done();
		});

		it("must not fix errors when `fix` parameter is set to false", async done => {
			const result = await handleLintSass({
				...options,
				files: "src/can-fix.scss"
			});

			expect(result.length).toBeTruthy();
			done();
		});

	});

});

