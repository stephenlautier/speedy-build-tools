import * as process from "process";
import * as rimraf from "rimraf";
import { mkdirSync, symlinkSync, constants, existsSync } from "fs";
import { argv } from "yargs";
import { join } from "path";
import { cyan, red } from "colors";

const prefix = "@obg/";
const packageNameUnPrefixed = argv._[0];
const exec = require("child_process").exec;

if (!packageNameUnPrefixed) {
	enableLinking();
} else {
	createLink();
}

function enableLinking() {
	console.log(cyan("Started rebuilding and enabling link ..."));

	exec("gulp rebuild --rel && npm link", (error: Error) => {
		if (error) {
			console.log(red(error.name));
			console.error(error.stack);

			process.exit(0);
		}

		console.log(cyan("Finished rebuilding and enabling link"));
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