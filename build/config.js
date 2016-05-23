var path = require("path");
var fs = require("fs");

var pkg = JSON.parse(fs.readFileSync("./package.json", "utf-8"));
var appRoot = "src";
const typings = "typings/index.d.ts";

module.exports = {
	root: appRoot,
	output: "dist",
	artifact: "_artifact",
	src: {
		ts: `${appRoot}/**/*.ts`,
		typings: typings
	},
	test: {
		files: `${appRoot}/**/*.spec.{ts,d.ts}`,
		karmaConfig: "karma.conf.js",
		output: "_artifact/test/unit",
		reporters: ["mocha"],
		browsers: ["Chrome"]
	},
	doc: "./doc",
	packageName: pkg.name,
	loadPluginsOptions: {
		pattern: [
			"gulp-*",
			"gulp.*",
			"run-sequence",
			"del",
			"browser-sync",
			"conventional-changelog",
			"merge2",
			"karma",
			"path"
		]
	}
};