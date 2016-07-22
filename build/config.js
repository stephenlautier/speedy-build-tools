var fs = require("fs");

var pkg = JSON.parse(fs.readFileSync("./package.json", "utf-8"));
var srcRoot = "src";
var artifactRoot = "_artifact";
const typings = "typings/index.d.ts";

module.exports = {
	output: {
		root: "dist"
	},
	src: {
		root: srcRoot,
		ts: `${srcRoot}/**/*.ts`,
		typings: typings
	},
	artifact: {
		root: artifactRoot,
		amd: `${artifactRoot}/amd`
	},
	test: {
		files: `${srcRoot}/**/*.spec.{ts,d.ts}`,
		karmaConfig: "karma.conf.js",
		output: `${artifactRoot}/test/unit`,
		reporters: ["mocha"],
		browsers: ["Chrome"]
	},
	doc: "./doc",
	packageName: pkg.name,
	loadPluginsOptions: {
		pattern: [
			"gulp-*",
			"gulp.*",
			"git-guppy",
			"run-sequence",
			"del",
			"conventional-changelog",
			"merge2",
			"karma",
			"path",
			"stylelint",
			"postcss-*"
		]
	}
};