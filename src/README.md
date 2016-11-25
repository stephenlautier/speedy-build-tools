# Content
Provides build tools for consumption from obg libraries.
* Link
* Deps-sync

**Quick links**

[Change logs][changeLog] | [Project Repository][projectUri] | [Contribution guidelines][contribWiki]

# Link

## Description

Provides functionality to:
* Make the current library linkable.
* Create a symbolic link to another library. This differs from `npm link *library*` by only linking parts of the directory contents.

## Consuming

```ts
import * as process from "process";
import * as yargs from "yargs";
import { enableLinking, createLink } from "@obg/build-tools";

const prefix = "@obg";
const packageNameUnPrefixed = yargs.argv._[0];
const argv = yargs(JSON.parse(process.env.npm_config_argv).original)
	.alias("watch", "w")
	.default("watch", false)
	.argv;

if (!packageNameUnPrefixed) {
	enableLinking(argv.watch);
} else {
	createLink(prefix, packageNameUnPrefixed);
}
```

# Deps-sync

## Description

Pulls dependencies from `@obg/build-tools` package.json into the current library's package.json.

## Consuming

```ts
import * as path from "path";
import { syncDependencies } from "@obg/build-tools";

const packageJsonPath = path.join(__dirname, "../");
syncDependencies(packageJsonPath, "baseDependencies", "devDependencies");
```