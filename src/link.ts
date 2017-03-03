import * as process from "process";
import * as rimraf from "rimraf";
import * as yargs from "yargs";
import * as spawn from "cross-spawn-promise";
import { mkdirSync, symlinkSync, constants, existsSync } from "fs";
import { join } from "path";

import {
	Logger,
	Worker,
	Timer,
	readFileAsync,
	globArray,
	toArray,
	Args,
	getConfigFilePath,
	mergeArgsWithOptions
} from "./utils";

const logger = new Logger("Link");
const timer = new Timer(logger);

export interface LinkOptions {
	watch?: boolean;
}

const DEFAULT_VALUES: LinkOptions = {
	watch: false
};

export function link(options?: LinkOptions): Promise<any> {
	const prefix = "@obg";
	const packageNameUnPrefixed = process.argv[3];
	const mergedOptions = mergeArgsWithOptions(DEFAULT_VALUES, options);

	if (!packageNameUnPrefixed) {
		return enableLinking(mergedOptions);
	} else {
		return createLink(prefix, packageNameUnPrefixed);
	}
}

export async function enableLinking(options: LinkOptions): Promise<any> {
	timer.start();

	const watch = options.watch;

	try {
		await spawn("npm", ["link"]);

		if (!watch && !existsSync("dist")) {
			mkdirSync("dist", constants.S_IRWXO);
		}

		if (watch) {
			await spawn("gulp", ["clean"], { stdio: "inherit" });
			await spawn("gulp", ["watch"], { stdio: "inherit" });
		}

		timer.finish();
	} catch (error) {
		logger.error(error.stderr.toString());
		process.exit(1);
	}
}

export async function createLink(prefix: string, packageNameUnPrefixed: string): Promise<any> {
	timer.start();

	const packageName = `${prefix}/${packageNameUnPrefixed}`;

	try {
		const stdout = await spawn("npm", ["config", "get", "prefix"]) as NodeBuffer;

		let path = stdout.toString().replace("\n", "");

		if (!path.toUpperCase().indexOf("APPDATA")) {
			// ios
			path = join(path, "lib");
		}

		const modulePrefixPath = join("node_modules", prefix);
		const modulePackagePath = join(modulePrefixPath, packageNameUnPrefixed);
		const nodeLinkPath = join(path, modulePackagePath);

		if (!existsSync(nodeLinkPath)) {
			logger.error(`Cannot find package '${packageName}'. Did you enable linking?`);
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

		logger.info("Installing typings...");
		await spawn("typings", ["install", `npm:${packageName}`, "--save"]);

		timer.finish();

	} catch (error) {
		logger.error(error.stderr.toString());
		process.exit(1);
	}
}

export const linkModule: yargs.CommandModule = {
	command: "link",
	describe: "Link libraries",
	handler: link,
	builder: yargs => {
		Args.setBoolean("watch", DEFAULT_VALUES.watch, "w");
		return yargs;
	}
};