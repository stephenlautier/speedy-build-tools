#!/usr/bin/env node
var _ = require("lodash");

if (process.argv.length > 2) {
	if (process.env.npm_config_argv) {
		var npmRunArgs = JSON.parse(process.env.npm_config_argv);
		if (npmRunArgs && npmRunArgs.original && npmRunArgs.original.length > 2) {
			// add flags from original "npm run" command
			for (var i = 2; i < npmRunArgs.original.length; i++) {
				process.argv.push(npmRunArgs.original[i]);
			}
		}
	}

	var task = process.argv[2];

	require("../dist/commonjs")[_.camelCase(task)]()
		.catch(error => console.error(task, error));

} else {
	console.error("Missing obg build tools task name");
}
