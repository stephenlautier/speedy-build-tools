import "rxjs/Rx";
import { TestBed } from "@angular/core/testing";
import {
	BrowserDynamicTestingModule,
	platformBrowserDynamicTesting
} from "@angular/platform-browser-dynamic/testing";

TestBed.initTestEnvironment(
	BrowserDynamicTestingModule,
	platformBrowserDynamicTesting()
);

export function onlySpecFiles(path: string): boolean {
	return /\.spec\.js$/.test(path);
}

// normalize paths to module names
export function file2moduleName(filePath: string): string {
	return filePath.replace(/\\/g, "/")
		.replace(/^\/base\//, "")
		.replace(/\.js/, "");
}

// import module path
export function importModules(path: string): Promise<any> {
	return SystemJS.import(path);
}