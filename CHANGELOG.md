<a name="0.2.0"></a>
# [0.2.0](https://github.com/alan-agius4/speedy-build-tools/compare/v0.1.4...v0.2.0) (2017-04-01)


### Features

* **ts lint:** update ts lint rules ([7fb49c6](https://github.com/alan-agius4/speedy-build-tools/commit/7fb49c6))
* **ts lint:** updated to `5.x` ([7f68ccb](https://github.com/alan-agius4/speedy-build-tools/commit/7f68ccb))



<a name="0.1.4"></a>
## [0.1.4](https://github.com/alan-agius4/speedy-build-tools/compare/v0.1.3...v0.1.4) (2017-03-26)


### Bug Fixes

* **config:** fixed an issue which was preventing base configs to be shared ([cd05b20](https://github.com/alan-agius4/speedy-build-tools/commit/cd05b20))
* **lint:** process was exiting before finish log ([c0c6f96](https://github.com/alan-agius4/speedy-build-tools/commit/c0c6f96))
* **typings:** missing types in package ([69181b1](https://github.com/alan-agius4/speedy-build-tools/commit/69181b1))


### Features

* **typescript:** update `TypeScript` to `2.2.1` ([84b71db](https://github.com/alan-agius4/speedy-build-tools/commit/84b71db))



<a name="0.1.3"></a>
## [0.1.3](https://github.com/alan-agius4/speedy-build-tools/compare/v0.1.2...v0.1.3) (2017-03-23)


### Bug Fixes

* **config:** fixed an issue which was preventing base configs to be shared ([fcca444](https://github.com/alan-agius4/speedy-build-tools/commit/fcca444))
* **tslint:** fixed tslint config `rulesDirectory` was invalid ([ab687fb](https://github.com/alan-agius4/speedy-build-tools/commit/ab687fb))



<a name="0.1.2"></a>
## [0.1.2](https://github.com/alan-agius4/speedy-build-tools/compare/v0.1.1...v0.1.2) (2017-03-22)


### Features

* **lint config:** move them into a seperate folder ([9bd5299](https://github.com/alan-agius4/speedy-build-tools/commit/9bd5299))



<a name="0.1.1"></a>
## [0.1.1](https://github.com/alan-agius4/speedy-build-tools/compare/v0.1.0...v0.1.1) (2017-03-22)


### Bug Fixes

* **logger:** debug should not log when argv is false ([3a39cb8](https://github.com/alan-agius4/speedy-build-tools/commit/3a39cb8))
* **worker:** error for exporting `worker.process` ([5376926](https://github.com/alan-agius4/speedy-build-tools/commit/5376926))


### Features

* **tslint:** exported `LintTsResult` ([078aa81](https://github.com/alan-agius4/speedy-build-tools/commit/078aa81))



<a name="0.1.0"></a>
# [0.1.0](https://github.com/alan-agius4/speedy-build-tools/compare/v0.0.3...v0.1.0) (2017-03-21)


### Bug Fixes

* **args:** handle arguments with `=` as they were not being parsed properly ([d2b9e56](https://github.com/alan-agius4/speedy-build-tools/commit/d2b9e56))
* **lint ts:** fixed result from being emitted multiple times ([981589b](https://github.com/alan-agius4/speedy-build-tools/commit/981589b))


### Features

* **cli:** cli shorthand command ([63c3744](https://github.com/alan-agius4/speedy-build-tools/commit/63c3744))


### BREAKING CHANGES

* **cli:** replace `sbt` with `speedy` as a shorthand version



<a name="0.0.3"></a>
## [0.0.3](https://github.com/alan-agius4/speedy-build-tools/compare/v0.0.2...v0.0.3) (2017-03-19)


### Bug Fixes

* **args:** `process.argv` was being ignored when `process.env.npm_config_argv` had values ([9941b53](https://github.com/alan-agius4/speedy-build-tools/commit/9941b53))


### Features

* **cli:** add `sbt` as shorthand version for `speedy-build-tools` ([d768925](https://github.com/alan-agius4/speedy-build-tools/commit/d768925))
* **lint:** remove `Codelyzer` from lint stack. ([147d76d](https://github.com/alan-agius4/speedy-build-tools/commit/147d76d))
* **lint html:** initial implementation ([fc4dbca](https://github.com/alan-agius4/speedy-build-tools/commit/fc4dbca))
* **utils:** add string `toPrimitive` method ([27c99ab](https://github.com/alan-agius4/speedy-build-tools/commit/27c99ab))



<a name="0.0.2"></a>
## [0.0.2](https://github.com/alan-agius4/speedy-build-tools/compare/v0.0.1...v0.0.2) (2017-03-13)


### Features

* **clean:** Initial implementation of clean task ([b3a8203](https://github.com/alan-agius4/speedy-build-tools/commit/b3a8203))
* **utils:** implement `deleteAsync` ([5e093f1](https://github.com/alan-agius4/speedy-build-tools/commit/5e093f1))

### BREAKING CHANGES
* **utils:** rename `globArray` to `glob`


<a name="0.0.1"></a>
## 0.0.1 (2017-03-12)


### Features

* **findRoot:** make filePath optional ([0ea08ed](https://github.com/alan-agius4/speedy-build-tools/commit/0ea08ed))
* **lint ts:** Update `tslint` to `4.4.2` ([cf5b87f](https://github.com/alan-agius4/speedy-build-tools/commit/cf5b87f))
* **logger:** Improve error message display ([80ddb66](https://github.com/alan-agius4/speedy-build-tools/commit/80ddb66))
* **tests:** implement test setup ([8fe5c84](https://github.com/alan-agius4/speedy-build-tools/commit/8fe5c84))
* **utils:** add `findRoot` function ([#15](https://github.com/alan-agius4/speedy-build-tools/issues/15)) ([1b8942e](https://github.com/alan-agius4/speedy-build-tools/commit/1b8942e))



