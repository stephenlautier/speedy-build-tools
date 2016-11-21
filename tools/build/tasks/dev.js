var config = require("../config");
var args = require("../args");
var gulp = require("gulp");
var $ = require("gulp-load-plugins")(config.loadPluginsOptions);

gulp.task("watch", () => {
	// ts/html

	args.continueOnError = true;

	gulp.watch([config.src.ts, `!${config.test.files}`], () => {
		return $.runSequence(
			"scripts",
			"build:copy-dist"
		);
	}).on("change", reportChange)
		.on("error", swallowError);
});

function reportChange(event) {
	$.util.log(`File ${event.path} was ${event.type}, running tasks...`);
}

function swallowError(error) {
	$.util.log($.util.colors.red(`Error occurred while running watched task. Error details: ${error}`));
}