import * as yargs from "yargs";

import { linkModule } from "./link";
import { lintSassModule, lintTsModule } from "./lint";

yargs
	.command(linkModule)
	.command(lintSassModule)
	.command(lintTsModule)

	.help()
	.alias("help", "h")

	.version()
	.alias("version", "v")
	.wrap(yargs.terminalWidth() - 1) // - 1 is required to fit in screen
	.argv;