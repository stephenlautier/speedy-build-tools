var config = require("../config");
var gulp = require("gulp");
var $ = require("gulp-load-plugins")(config.loadPluginsOptions);
var args = require("../args");

gulp.task("scripts", (cb) => {
	return $.runSequence([
		"generate:amd",
		"generate:es2015"
	], cb);
});

gulp.task("generate:amd", (cb) => {
	compileTsAndRunNgc(config.artifact.amd, "es5", "amd", true, cb);
});

gulp.task("generate:es2015", (cb) => {
	compileTsAndRunNgc(config.artifact.es2015, "es5", "es2015", false, cb);
});

function runNgc(configPath, callback) {
	const exec = require("child_process").exec;

	exec(`"node_modules/.bin/ngc" -p ${configPath}`, (err) => {
		callback(err);
	});
}

function copySourceToDest(src) {
	return gulp.src([config.src.ts, `!${config.test.files}`])
		.pipe(gulp.dest(src));
}

function compileTsAndRunNgc(dest, target, moduleType, deleteTypings, callback) {
	copySourceToDest(dest)
		.on("end", () => {
			createTempTsConfig(target, moduleType, dest);

			runNgc(`${dest}/tsconfig.json`, (error) => {
				if (error) {
					callback(error);
					return;
				}

				var filesToDelete = [
					`${dest}/**/*.json`,
					`${dest}/node_modules`,
					`${dest}/**/*.ts`
				]

				if (!deleteTypings) {
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
		});
}

function createTempTsConfig(target, moduleType, path) {
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
		path,
		"../../typings/index.d.ts"
	];

	fs.writeFileSync(`${path}/tsconfig.json`, JSON.stringify(config, null, 2));
}