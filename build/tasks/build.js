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
	return runSeq(["copy-dist:scripts", "copy-dist:dts"]);
});

gulp.task("copy-dist:scripts", () => {
	return gulp.src(`${config.artifact.amd}/**/*.js`)
		.pipe(gulp.dest(`${config.output.root}/amd`));
});

gulp.task("copy-dist:dts", () => {
	return gulp.src(`${config.artifact.root}/typings/**/*.d.ts`)
		.pipe(gulp.dest(`${config.output.root}/typings`));
});