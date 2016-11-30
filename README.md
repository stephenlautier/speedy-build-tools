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

## Using linking functions

```js
import { enableLinking, createLink } from "@obg/build-tools";

enableLinking();

createLink("@obg", "ng2.common");
```

# npm Scripts

Instead of depending on external task runners, Obg Build Tools can be configured to being executed from npm scripts.
```
"scripts": {
    "link": "obg-build-tools link",
    "sync": "obg-build-tools sync-dependencies"
},
````
To run the build script found in the package.json scripts property, execute:

```
npm run sync
```


## Tasks

| Task                | Description                                                                                         |
|---------------------|-----------------------------------------------------------------------------------------------------|
| `sync-dependencies` | Sync dependencies between projects                                                                  |
| `link`              | Link to an OBG Library. Don’t provide the `@obg/` prefix.                                           |

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