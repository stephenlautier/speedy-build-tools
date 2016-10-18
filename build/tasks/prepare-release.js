var config = require("../config");
var gulp = require("gulp");
var $ = require("gulp-load-plugins")(config.loadPluginsOptions);
var args = require("../args");

gulp.task("prepare-release", (cb) => {
	args.isRelease = true;

	return $.runSequence(
		"clean",
		"build",
		"test",
		"bump-version",
		// todo: find a solution for the docs
		// "doc",
		"changelog",
		cb);
});

gulp.task("bump-version", () => {
	return gulp.src(["./package.json"])
		.pipe($.bump({ type: args.bump, preid: args.versionSuffix })) //major|minor|patch|prerelease
		.pipe(gulp.dest("./"));
});

gulp.task("changelog", () => {
	return gulp.src(`${config.doc}/CHANGELOG.md`)
		.pipe($.conventionalChangelog({
			preset: "angular",
			releaseCount: 0,
		}))
		.pipe(gulp.dest(`${config.doc}/`));
});