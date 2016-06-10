var config = require("../config");
var args = require("../args");
var gulp = require("gulp");
var $ = require("gulp-load-plugins")(config.loadPluginsOptions);

gulp.task("watch", () => {
	if (args.isRelease) {
		// ts
		gulp.watch([config.src.ts, `!${config.test.files}`], () => {
			return $.runSequence(
				"compile:ts",
				"build:copy-dist"
			);
		}).on("change", reportChange)
			.on("error", swallowError);
	} else {
		// ts
		gulp.watch([config.src.ts, `!${config.test.files}`], ["compile:ts"])
			.on("change", reportChange)
			.on("error", swallowError);
	}
});

function reportChange(event) {
	$.util.log(`File ${event.path} was ${event.type}, running tasks...`);
}

function swallowError(error) {
	$.util.log($.util.colors.red(`Error occurred while running watched task. Error details: ${error}`));
}