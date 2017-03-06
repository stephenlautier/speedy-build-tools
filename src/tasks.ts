import { command } from "yargs";
import { linkModule } from "./link";

command(linkModule)
	.help()
	.argv;