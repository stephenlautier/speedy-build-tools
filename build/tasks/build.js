var args = require("../args");
var config = require("../config");
var gulp = require("gulp");
var $ = require("gulp-load-plugins")(config.loadPluginsOptions);

gulp.task("build", (cb) => {
	var tasksToRun = [
		"lint",
		"scripts"
	];

	if (args.isRelease) {
		return $.runSequence(tasksToRun,
			"build:copy-dist",
			cb);
	}

	return $.runSequence(tasksToRun,
		cb);
});

gulp.task("rebuild", (cb) => {
	if (args.isRelease) {
		return $.runSequence(
			"clean",
			"build",
			"build:copy-dist",
			cb);
	}
	return $.runSequence(
		"clean:artifact",
		"build",
		cb);
});

gulp.task("ci", (cb) => {
	return $.runSequence(
		"rebuild",
		"test",
		cb);
});

gulp.task("build:copy-dist", () => {
	return gulp.src([
			`${config.artifact.root}/**/*`,
			`!${config.test.output}/**/*`])
		.pipe(gulp.dest(config.output.root));
});