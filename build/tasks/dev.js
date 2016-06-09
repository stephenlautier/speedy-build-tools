var config = require("../config");
var args = require("../args");
var gulp = require("gulp");
var $ = require("gulp-load-plugins")(config.loadPluginsOptions);

var reportChange = function (event) {
	console.log(`File ${event.path} was ${event.type}, running tasks...`);
};

var swallowError = function (error) {
	console.log($.util.colors.red(`Error occurred while running watched task...`));
};

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