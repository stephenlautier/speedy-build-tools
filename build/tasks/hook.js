var config = require("../config");

var gulp = require("gulp");
var $ = require("gulp-load-plugins")(config.loadPluginsOptions);
var guppy = $.gitGuppy(gulp);

gulp.task("pre-commit", () => {
	return guppy.stream("pre-commit")
		.pipe($.filter([config.src.ts, `!${config.test.files}`]))
		.pipe($.tslint())
		.pipe($.tslint.report($.tslintStylish, {
			emitError: true,
			sort: true,
			bell: false
		}));
});