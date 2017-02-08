import * as process from "process";
import * as rimraf from "rimraf";
import * as yargs from "yargs";
import * as spawn from "cross-spawn-promise";
import { mkdirSync, symlinkSync, constants, existsSync } from "fs";
import { join } from "path";

import { Logger } from "./utils/logger";
import { Timer } from "./utils/timer";

const logger = new Logger("Link");
const timer = new Timer(logger);

export function link(): Promise<any> {
	const prefix = "@obg";
	const packageNameUnPrefixed = yargs.argv._[1];
	const argv = yargs(JSON.parse(process.env.npm_config_argv).original)
		.alias("watch", "w")
		.default("watch", false)
		.argv;

	if (!packageNameUnPrefixed) {
		return enableLinking(argv.watch);
	} else {
		return createLink(prefix, packageNameUnPrefixed);
	}
}

export function enableLinking(watch = false): Promise<any> {
	timer.start();

	return spawn("npm", ["link"])
		.then(() => {
			if (!watch && !existsSync("dist")) {
				mkdirSync("dist", constants.S_IRWXO);
			}

			timer.finish();
		})
		.then(() => {
			if (!watch) {
				return;
			}

			return spawn("gulp", ["clean"], { stdio: "inherit" })
				.then(() => spawn("gulp", ["watch"], { stdio: "inherit" }));
		})
		.catch((error: any) => {
			logger.error(error.stderr.toString());
			process.exit(1);
		});
}

export function createLink(prefix: string, packageNameUnPrefixed: string): Promise<any> {
	const packageName = `${prefix}/${packageNameUnPrefixed}`;

	timer.start();

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
				logger.error(`Error: Cannot find package '${packageName}'. Did you enable linking?`);
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

			logger.log("Installing typings...");
			return spawn("typings", ["install", `npm:${packageName}`, "--save"]);
		})
		.then(() => {
			timer.finish();
		})
		.catch((error: any) => {
			logger.error(error.stderr.toString());
			process.exit(1);
		});
}