// reference: https://github.com/ocombe/ng2-translate/blob/master/karma-test-shim.js

// Turn on full stack traces in errors to help debugging
Error.stackTraceLimit = Infinity;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 100;

// Cancel Karma"s synchronous start,
// we will call `__karma__.start()` later, once all the specs are loaded.
__karma__.loaded = function () { };

SystemJS.config({
	baseURL: "/base/",
	defaultJSExtensions: true,
	paths: {
		"npm:": "node_modules/"
	},
	map: {
		"@angular/core": "npm:@angular/core/bundles/core.umd.js",
		"@angular/common": "npm:@angular/common/bundles/common.umd.js",
		"@angular/compiler": "npm:@angular/compiler/bundles/compiler.umd.js",
		"@angular/platform-browser": "npm:@angular/platform-browser/bundles/platform-browser.umd.js",
		"@angular/platform-browser-dynamic": "npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js",
		"@angular/http": "npm:@angular/http/bundles/http.umd.js",

		// angular testing umd bundles
		"@angular/core/testing": "npm:@angular/core/bundles/core-testing.umd.js",
		"@angular/common/testing": "npm:@angular/common/bundles/common-testing.umd.js",
		"@angular/compiler/testing": "npm:@angular/compiler/bundles/compiler-testing.umd.js",
		"@angular/platform-browser/testing": "npm:@angular/platform-browser/bundles/platform-browser-testing.umd.js",
		"@angular/platform-browser-dynamic/testing": "npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic-testing.umd.js",
		"@angular/http/testing": "npm:@angular/http/bundles/http-testing.umd.js",

		// skeleton vendors - DO NOT TOUCH UNLESS FROM SKELETON.
		"@obg": "npm:@obg",
		"rxjs": "npm:rxjs",
		"lodash": "npm:lodash",
		"moment": "npm:moment/min",
		"cachefactory": "npm:cachefactory/dist",
		"raven-js": "npm:raven-js/dist",
		"ng2-translate": "npm:ng2-translate"

		// vendors - package vendors here...

	},
	packages: {
		// skeleton vendors - DO NOT TOUCH UNLESS FROM SKELETON.
		"lodash": { main: "index.js", defaultExtension: "js" },
		"moment": { main: "moment-with-locales.js", defaultExtension: "js" },
		"cachefactory": { main: "cachefactory.js", defaultExtension: "js" },
		"rxjs": { main: "Rx.js", defaultExtension: "js" },
		"raven-js": { main: "raven.min.js", defaultExtension: "js" },
		"ng2-translate": { main: "ng2-translate.js", defaultExtension: "js" }

		// obg

		// vendors - package vendors here...

	}
});

SystemJS.import("test/test-setup")
	.then(function (util) {
		return Promise.all(
			Object.keys(window.__karma__.files)
				.filter(util.onlySpecFiles)
				.map(util.file2moduleName)
				.map(importModules)
		);
	})
	.then(function () {
		__karma__.start();
	}, function (error) {
		__karma__.error(error.name + ": " + error.message);
	});

function importModules(path) {
	return SystemJS.import(path);
}