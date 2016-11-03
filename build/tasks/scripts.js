var config = require("../config");
var gulp = require("gulp");
var $ = require("gulp-load-plugins")(config.loadPluginsOptions);
var args = require("../args");

gulp.task("scripts", (cb) => {
	return $.runSequence(
		"copy:scripts", [
			"generate:umd",
			"generate:es2015"
		], cb);
});

gulp.task("generate:umd", (cb) => {
	compileTsAndRunNgc({
		dest: config.artifact.umd,
		target: "es5",
		moduleType:"umd",
		deleteTypings: false
	}, cb);
});

gulp.task("generate:es2015", (cb) => {
	compileTsAndRunNgc({
		dest: config.artifact.es2015,
		target: "es5",
		moduleType:"es2015",
		deleteTypings: false
	}, cb);
});

gulp.task("copy:scripts", () => {
	return gulp.src([config.src.ts, `!${config.test.files}`])
		.pipe(gulp.dest(config.artifact.umd))
		.pipe(gulp.dest(config.artifact.es2015));
});

function runNgc(configPath, callback) {
	const exec = require("child_process").exec;

	exec(`"node_modules/.bin/ngc" -p ${configPath}`, (error) => {
		if (error) {
			console.error(error);
			process.exit(1);
		}

		callback();
	});
}

function compileTsAndRunNgc(options, callback) {
	const dest = options.dest;
	createTempTsConfig(dest, options.target, options.moduleType);

	runNgc(`${dest}/tsconfig.json`, () => {
		const filesToDelete = [
			`${dest}/**/*.json`,
			`${dest}/node_modules`,
			`${dest}/**/*.ts`
		]

		if (!options.deleteTypings) {
			filesToDelete = [
				...filesToDelete,
				`!${dest}/**/*.d.ts`,
				`!${dest}/**/*.metadata.json`
			];
		}

		return $.del(filesToDelete).then(() => {
			callback();
		})
	});
}

function createTempTsConfig(path, target, moduleType) {
	const fs = require("fs");
	const config = require("../../tsconfig.json", "utf-8");

	config.compilerOptions = Object.assign(
		{},
		config.compilerOptions, {
			outDir: "",
			module: moduleType,
			target: target
		}
	);

	config.include = [
		"./index.ts"
	];

	fs.writeFileSync(`${path}/tsconfig.json`, JSON.stringify(config, null, 2));
}