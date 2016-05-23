var config = require("../config");
var gulp = require("gulp");
var $ = require("gulp-load-plugins")(config.loadPluginsOptions);

var args = require("../args");

gulp.task("test", (cb) => {
	runTests(true, cb);
});

gulp.task("tdd", (cb) => {
	runTests(false, cb);
});

function runTests(singleRun, cb) {

	new $.karma.Server({
		configFile: $.path.join(__dirname, `../../${config.test.karmaConfig}`),
		singleRun: singleRun,
		autoWatch: !singleRun,
		reporters: args.reporter,
		browsers: args.browser
	}, (code) => {
		
		// make sure failed karma tests cause gulp to exit non-zero
		if (code === 1) {
			$.util.log($.util.colors.red("------- Error: unit test failed -------"));
			return process.exit(1);
		}
		cb();
	}).start();
}