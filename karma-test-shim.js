// reference: https://github.com/ocombe/ng2-translate/blob/master/karma-test-shim.js

// Turn on full stack traces in errors to help debugging
Error.stackTraceLimit = Infinity;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

// Cancel Karma"s synchronous start,
// we will call `__karma__.start()` later, once all the specs are loaded.
__karma__.loaded = function () { };

System.config({
	baseURL: "/base/",
	defaultJSExtensions: true,
	map: {
		"@angular": "node_modules/@angular",
		"cachefactory": "node_modules/cachefactory/dist",
		"rxjs": "node_modules/rxjs",
		"lodash": "node_modules/lodash",
		"jasmine-jquery": "node_modules/jasmine-jquery/lib",
		"jquery": "node_modules/jquery/dist"
	},
	packages: {
		"@angular/common": { main: "index.js", defaultExtension: "js" },
		"@angular/compiler": { main: "index.js", defaultExtension: "js" },
		"@angular/core": { main: "index.js", defaultExtension: "js" },
		"@angular/http": { main: "index.js", defaultExtension: "js" },
		"@angular/platform-browser": { main: "index.js", defaultExtension: "js" },
		'@angular/platform-browser-dynamic': { main: 'index.js', defaultExtension: 'js' },
		"jasmine-jquery": { main: "jasmine-jquery.js", defaultExtension: "js" },
		"jquery": { main: "jquery.min.js", defaultExtension: "js" }
	}
});

System.import('@angular/platform-browser/src/browser/browser_adapter')
	.then(function (browser_adapter) { 
		browser_adapter.BrowserDomAdapter.makeCurrent(); 
	})
	.then(function () {
		return Promise.all([
			System.import('@angular/core/testing'),
			System.import('@angular/platform-browser-dynamic/testing/browser')
		]);
	})
	.then(function (modules) {
		var testing = modules[0];
		var testingBrowser = modules[1];

		testing.setBaseTestProviders(
			testingBrowser.TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
			testingBrowser.TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS);
	})
	.then(function () {
		return Promise.all(resolveTestFiles());
	})
	.then(function () {
		__karma__.start();
	}, function (error) {
		__karma__.error(error.stack || error);
	});

function onlySpecFiles(path) {
	return /[\.|_]spec\.js$/.test(path);
}
function resolveTestFiles() {
	return Object.keys(window.__karma__.files)  // All files served by Karma.
		.filter(onlySpecFiles)
		.map(function (moduleName) {
			// loads all spec files via their global module names (e.g.
			// 'base/dist/vg-player/vg-player.spec')
			return System.import(moduleName);
		});
}
