var path = require("path");
var conf = require("./build/config");

module.exports = function (config) {
	config.set({
		basePath: "",
		frameworks: ["jasmine"],

		files: [
			"node_modules/es6-shim/es6-shim.js",
			"node_modules/zone.js/dist/zone.js",
			"node_modules/zone.js/dist/long-stack-trace-zone.js",
			"node_modules/zone.js/dist/jasmine-patch.js",
			"node_modules/systemjs/dist/system.src.js",
			"node_modules/reflect-metadata/Reflect.js",

			{ pattern: "node_modules/reflect-metadata/**/*.js.map", included: false, watched: false, served: true },
			{ pattern: "node_modules/@angular/**/*.js", included: false, watched: false, served: true },
			{ pattern: "node_modules/@angular/**/*.js.map", included: false, watched: false, served: true },
			{ pattern: "node_modules/rxjs/**/*.js", included: false, watched: false, served: true },
			{ pattern: "node_modules/rxjs/**/*.js.map", included: false, watched: false, served: true },
			{ pattern: "node_modules/systemjs/dist/system-polyfills.js", included: false, watched: false, served: true }, // PhantomJS2 (and possibly others) might require it

			{ pattern: conf.src.ts, included: false, watched: true }, // source files
			"karma-test-shim.js"
		],

		exclude: [
			"node_modules/@angular/**/*_spec.js"
		],

		preprocessors: {
			"src/**/*.ts": ["typescript"]
		},

		typescriptPreprocessor: {
			// options: require("./tsconfig.json").compilerOptions
			options: {
				inlineSourceMap: true,
				inlineSources: true
			}
		},
		reporters: ["mocha"],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: true,
		browsers: ["Chrome"],
		singleRun: false
	})
}
