[projectUri]: https://bitbucketsson.betsson.local/projects/WF/repos/obg.build-tools
[projectGit]: https://bitbucketsson.betsson.local/scm/wf/obg.build-tools.git
[changeLog]: ./doc/CHANGELOG.md

[contribWiki]: https://wikisson.betsson.local/display/SG/Contribution+Guidelines
[releaseWorkflowWiki]: https://wikisson.betsson.local/display/SG/Prepare+new+Release+for+Library
[setupMachineWiki]: https://wikisson.betsson.local/display/SG/Setup+Machine+for+Development+-+Libraries

# obg.build-tools
OBG build tools 

**Quick links**

[Change logs][changeLog] | [Project Repository][projectUri] | [Contribution guidelines][contribWiki]

# Getting Started

## Installation

```
npm install @obg/build-tools --save
```

# Usage

## Register module

```js
var buildTools = require("@obg/build-tools");

buildTools.enableLinking();

buildTools.createLink("@obg", "ng2.common");
```

# Contributing to the project
In order to contribute please read the [Contribution guidelines][contribWiki].

## Setup Machine for Development
Install/setup the machine by following [Setup Machine for Development - Libraries WIKI][setupMachineWiki].

## Setup Project to Develop

### Cloning Repo

- Open SourceTree
- Clone project repo from [project git][projectGit]
- Switch to `develop` branch


## Project Setup
The following process need to be executed in order to get started.

```
npm install
```


## Building the code

```
gulp build
```
In order to view all other tasks invoke `gulp` or check the gulp tasks directly.

## Development utils

### Trigger gulp watch
Handles compiling of changes.
```
gulp watch
```


## Preparation for Release

```
gulp prepare-release --bump major|minor|patch|prerelease (default: patch) --version-suffix beta (default: rc - only applies to prerelease)
```
Check out the [release workflow guide][releaseWorkflowWiki] in order to guide you creating a release and distributing it.