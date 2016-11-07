import * as process from "process";
import * as rimraf from "rimraf";
import * as yargs from "yargs";
import { mkdirSync, symlinkSync, constants, existsSync } from "fs";
import { join } from "path";
import { cyan, red } from "colors";

const prefix = "@obg/";
const packageNameUnPrefixed = yargs.argv._[0];
const exec = require("child_process").exec;

if (!packageNameUnPrefixed) {
	enableLinking();
} else {
	createLink();
}

function enableLinking() {
	console.log(cyan("Started enabling link ..."));

	exec("npm link", (error: Error) => {
		exitOnError(error);


		console.log(cyan("Started building ..."));
		exec("gulp rebuild --rel", (err: Error) => {
			exitOnError(err);
			console.log(cyan("Finished building"));
		});

		console.log(cyan("Finished enabling link"));
	});
}

function createLink() {
	const packageName = `${prefix}${packageNameUnPrefixed}`;

	console.log(cyan(`Started linking: ${packageName} ...`));

	exec("npm config get prefix", (error: Error, stdout: NodeBuffer) => {
		let path = stdout.toString().replace("\n", "");

		if (!path.toUpperCase().indexOf("APPDATA")) {
			// ios
			path = join(path, "lib");
		}

		const modulePrefixPath = join("node_modules", prefix);
		const modulePackagePath = join(modulePrefixPath, packageNameUnPrefixed);
		const nodeLinkPath = join(path, modulePackagePath);

		if (!existsSync(nodeLinkPath)) {
			exitOnError({
				name: "Error: Cannot find the linked module. Did you enable linking?",
				message: "",
				stack: ""
			});
		}

		if (!existsSync(modulePrefixPath)) {
			mkdirSync(modulePrefixPath, constants.S_IRWXO);
		}

		rimraf(modulePackagePath, err => {
			mkdirSync(modulePackagePath, constants.S_IRWXO);

			symlinkSync(join(nodeLinkPath, "dist"), join(modulePackagePath, "dist"), "dir");
			symlinkSync(join(nodeLinkPath, "package.json"), join(modulePackagePath, "package.json"));

			console.log(cyan(`Finished linking: ${packageName}`));
		});
	});
}

function exitOnError(error: Error) {
	if (error) {
		console.log(red(error.name));
		console.error(error.stack);
		console.error(error.message);

		process.exit(0);
	}
}