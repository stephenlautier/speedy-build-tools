var config = require("../config");
var gulp = require("gulp");
var $ = require("gulp-load-plugins")(config.loadPluginsOptions);
var args = require("../args");

gulp.task("scripts", (cb) => {
	return $.runSequence(
		["compile:ts"],
		cb);
});

gulp.task("compile:ts", () => {
	const tsProject = getTscOptions();
	const tsResult = gulp.src([config.src.typings, config.src.ts, `!${config.test.files}`])
		.pipe($.plumber())
		.pipe($.sourcemaps.init())
		.pipe(tsProject())
		.on("error", () => {
			if (!args.continueOnError) {
				process.exit(1);
			}
		});

	return $.merge2([
		tsResult.js
			.pipe($.sourcemaps.write("."))
			.pipe(gulp.dest(`${config.artifact.amd}`)),
		tsResult.dts
			.pipe(gulp.dest(`${config.artifact.root}/typings`))
	]);
});

function getTscOptions() {
	return $.typescript.createProject("tsconfig.json", {
		typescript: require("typescript")
	});
}