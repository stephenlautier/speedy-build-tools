var config = require("../config");
var gulp = require("gulp");
var $ = require("gulp-load-plugins")(config.loadPluginsOptions);
var args = require("../args");

gulp.task("scripts", (cb) => {
	return $.runSequence(
		"copy:scripts", [
			"generate:commonjs"
		], cb);
});

gulp.task("generate:commonjs", (cb) => {
	compileTs({
		dest: config.artifact.commonjs
	}, cb);
});

gulp.task("copy:scripts", () => {
	return gulp.src([config.src.ts, `!${config.test.files}`])
		.pipe(gulp.dest(config.artifact.commonjs));
});

function runTsc(configPath) {
	return $.crossSpawnPromise("node_modules/.bin/tsc", ["-p", configPath], { stdio: "inherit" })
		.catch((error) => {
			if (!error) {
				return;
			}

			console.error($.util.colors.red("TSC failed"));
			console.error($.util.colors.red(error.stderr ? error.stderr.toString() : error));

			if (!args.continueOnError) {
				process.exit(1);
			}
		});
}

function compileTs(options, callback) {
	const dest = options.dest;
	createTempTsConfig(dest, options.target, options.moduleType);

	const tsConfig = `${dest}/tsconfig.json`;

	return runTsc(tsConfig)
		.then(() => deleteFiles(options))
		.then(() => callback());
}

function deleteFiles(options) {
	const dest = options.dest;
	var filesToDelete = [
		`${dest}/**/*.json`,
		`${dest}/node_modules`,
		`${dest}/**/*.ts`
	];

	if (!options.deleteTypings) {
		filesToDelete = [
			...filesToDelete,
			`!${dest}/**/*.d.ts`,
			`!${dest}/**/*.metadata.json`
		];
	}

	return $.del(filesToDelete);
}

function createTempTsConfig(path, target, moduleType) {
	const fs = require("fs");
	const config = require("../../../tsconfig.json", "utf-8");

	config.compilerOptions = Object.assign(
		{},
		config.compilerOptions, {
			outDir: ""
		}
	);

	config.include = [
		"./index.ts",
		"./../../typings/**/*.d.ts"
	];

	fs.writeFileSync(`${path}/tsconfig.json`, JSON.stringify(config, null, 2));
}