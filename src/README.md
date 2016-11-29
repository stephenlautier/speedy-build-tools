# Content
Provides build tools for consumption from obg libraries.

* Link

	Provides functionality to:
	+ Make the current library linkable.
	+ Create a symbolic link to another library. This differs from `npm link *library*` by only linking parts of the directory contents.

* Sync Dependencies

	+ Pulls dependencies from `@obg/build-tools` package.json into the current library's package.json.

**Quick links**

[Change logs][changeLog] | [Project Repository][projectUri] | [Contribution guidelines][contribWiki]

# Link

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

# Sync Dependencies

```ts
import * as path from "path";
import { syncDependencies } from "@obg/build-tools";

syncDependencies("baseDependencies", "devDependencies");
```


