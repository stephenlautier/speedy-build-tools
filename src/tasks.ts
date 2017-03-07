import { command } from "yargs";
import { linkModule } from "./link";

command(linkModule)

	.help()
	.alias("help", "h")

	.version()
	.alias("version", "v")
	.argv;