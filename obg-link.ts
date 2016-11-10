import * as process from "process";
import * as rimraf from "rimraf";
import * as yargs from "yargs";
import { mkdirSync, symlinkSync, constants, existsSync } from "fs";
import { join } from "path";
import { cyan, red } from "colors";

const spawn = require("cross-spawn-promise");
const prefix = "@obg/";
const packageNameUnPrefixed = yargs.argv._[0];
const argv = yargs(JSON.parse(process.env.npm_config_argv).original)
	.alias("watch", "w")
	.default("watch", false)
	.argv;

if (!packageNameUnPrefixed) {
	enableLinking();
} else {
	createLink();
}

function enableLinking() {
	console.log(cyan("Starting enabling link ..."));

	return spawn("npm", ["link"])
		.then(() => {
			console.log(cyan("Finished enabling link"));
			console.log(cyan("Starting building ..."));

			return spawn("gulp", ["rebuild", "--rel"]);
		}).then(() => {
			console.log(cyan("Finished building ..."));

			if (argv.watch) {
				return spawn("gulp", ["watch", "--rel"], { stdio: "inherit" });
			}
		})
		.catch((error: any) => {
			console.log(red(error.stderr.toString()));
			process.exit(1);
		});
}

function createLink() {
	const packageName = `${prefix}${packageNameUnPrefixed}`;

	console.log(cyan(`Starting linking: ${packageName} ...`));

	return spawn("npm", ["config", "get", "prefix"])
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
				console.log(red(`Error: Cannot find package '${packageName}'. Did you enable linking?`));
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