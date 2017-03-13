import * as yargs from "yargs";

import { linkModule } from "./link";
import { cleanModule } from "./clean/clean";
import { lintSassModule, lintTsModule } from "./lint";

yargs
	.command(linkModule)
	.command(lintSassModule)
	.command(lintTsModule)
	.command(cleanModule)

	.help()
	.alias("help", "h")

	.version()
	.alias("version", "v")
	.wrap(yargs.terminalWidth() - 1) // - 1 is required to fit in screen
	.argv;