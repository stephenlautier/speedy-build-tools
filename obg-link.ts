import * as process from "process";
import * as rimraf from "rimraf";
import * as yargs from "yargs";
import { mkdirSync, symlinkSync, constants, existsSync } from "fs";
import { join } from "path";
import { cyan, red } from "colors";

const spawn = require("cross-spawn-promise");
const prefix = "@obg/";
const packageNameUnPrefixed = yargs.argv._[0];

if (!packageNameUnPrefixed) {
	enableLinking();
} else {
	createLink();
}

function enableLinking() {
	console.log(cyan("Starting enabling link ..."));

	spawn("npm", ["link"])
		.then(() => {
			console.log(cyan("Finished enabling link"));
			console.log(cyan("Starting building ..."));

			spawn("gulp", ["rebuild", "--rel"])
				.then(() => {
					console.log(cyan("Finished building ..."));

					if (isWatch()) {
						spawn("gulp", ["watch", "--rel"], { stdio: "inherit" });
					}
				})
				.catch((error: any) => {
					console.log(red(error.stderr.toString()));
					process.exit(1);
				});
		});
}

function createLink() {
	const packageName = `${prefix}${packageNameUnPrefixed}`;

	console.log(cyan(`Starting linking: ${packageName} ...`));

	spawn("npm", ["config", "get", "prefix"])
		.then((stdout: NodeBuffer) => {
			let path = stdout.toString().replace("\n", "");

			if (!path.toUpperCase().indexOf("APPDATA")) {
				// ios
				path = join(path, "lib");
			}

			const modulePrefixPath = join("node_modules", prefix);
			const modulePackagePath = join(modulePrefixPath, packageNameUnPrefixed);
			const nodeLinkPath = join(path, modulePackagePath);

			if (!existsSync(nodeLinkPath)) {
				console.log(red("Error: Cannot find the linked module. Did you enable linking?"));
				process.exit(1);
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
		})
		.catch((error: any) => {
			console.log(red(error.stderr.toString()));
			process.exit(1);
		});
}

function isWatch(): boolean {
	const fullName = "--watch";
	const shortName = "-w";
	const npmRunArgs = JSON.parse(process.env.npm_config_argv);

	if (!npmRunArgs.original) {
		return null;
	}

	const processArgv = npmRunArgs.original;

	for (let i = 2; i < processArgv.length; i++) {
		const arg = processArgv[i];

		if (arg === fullName || (shortName && arg === shortName)) {
			return true;
		}
	}

	return false;
}