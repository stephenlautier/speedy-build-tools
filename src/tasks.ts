import * as yargs from "yargs";

import { cleanModule } from "./clean/clean";
import { lintSassModule } from "./lint/lint-sass/lint-sass";
import { lintTsModule } from "./lint/lint-ts/lint-ts";
import { lintHtmlModule } from "./lint/lint-html/lint-html";

// tslint:disable-next-line:no-unused-expression
yargs
	.command(lintSassModule)
	.command(lintTsModule)
	.command(lintHtmlModule)

	.command(cleanModule)

	.help()
	.alias("help", "h")

	.version()
	.alias("version", "v")

	.wrap(yargs.terminalWidth() - 1) // - 1 is required to fit in screen
	.argv;