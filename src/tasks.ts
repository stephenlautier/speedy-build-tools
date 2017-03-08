import * as yargs from "yargs";

import { linkModule } from "./link";
import { lintSassModule } from "./lint";

yargs
	.command(linkModule)
	.command(lintSassModule)

	.help()
	.alias("help", "h")

	.version()
	.alias("version", "v")
	.wrap(yargs.terminalWidth() - 5)
	.argv;