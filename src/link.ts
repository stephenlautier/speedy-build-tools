import * as process from "process";
import * as rimraf from "rimraf";
import { mkdirSync, symlinkSync, constants, existsSync } from "fs";
import { join } from "path";
import { cyan, red } from "colors";

const spawn = require("cross-spawn-promise");

export function enableLinking(watch = false) {
	console.log(cyan("Starting enabling link ..."));

	return spawn("npm", ["link"])
		.then(() => {
			if (!watch && !existsSync("dist")) {
				mkdirSync("dist", constants.S_IRWXO);
			}

			console.log(cyan("Finished enabling link"));
		})
		.then(() => {
			if (!watch) {
				return;
			}

			return spawn("gulp", ["clean"], { stdio: "inherit" })
				.then(() => spawn("gulp", ["watch"], { stdio: "inherit" }));
		})
		.catch((error: any) => {
			console.log(red(error.stderr.toString()));
			process.exit(1);
		});
}

export function createLink(prefix: string, packageNameUnPrefixed: string) {
	const packageName = `${prefix}/${packageNameUnPrefixed}`;

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

				symlinkSync(join(nodeLinkPath, "dist"), join(modulePackagePath, "dist"), "junction");
				symlinkSync(join(nodeLinkPath, "package.json"), join(modulePackagePath, "package.json"));
			});

			console.log(cyan("Starting installing typings ..."));
			return spawn("typings", ["install", `npm:${packageName}`, "--save"]);
		})
		.then(() => {
			console.log(cyan("Finished installing typings"));
			console.log(cyan(`Finished linking: ${packageName}`));
		})
		.catch((error: any) => {
			console.log(red(error.stderr.toString()));
			process.exit(1);
		});
}