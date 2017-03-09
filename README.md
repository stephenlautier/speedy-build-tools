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
```json
"scripts": {
    "link": "obg-build-tools link",
    "sync": "obg-build-tools sync-dependencies"
},
````
To run the build script found in the package.json scripts property, execute:

```cmd
npm run sync
```


## Tasks

| Task                  | Description                                                                                            |
|-----------------------|--------------------------------------------------------------------------------------------------------|
| `sync-dependencies`   | Sync dependencies between projects                                                                     |
| `link`                | Link to an OBG Library. Don’t provide the @obg/ prefix.                                                |
| `lint-sass`           | Lint Sass files.                                                                                       |

### Lint Sass
```bash
obg-build-tools lint-sass
```

| Option                | Description                                              | Default Value                       | Type         |
|-----------------------|----------------------------------------------------------|-------------------------------------|--------------|
| `--config, -c`        | Lint rules file path                                     | `.stylelintrc` from `process.cwd()` | string       |
| `--files, -f`         | An array or string of globs to lint                      | `./src/**/.*(scss\|sass)`           | Array|string |
| `--formatter`         | The formatter to use to format the results of the linter | `verbose`                           | string       |
| `--fix`               | Automatically fix some linting issues                    | `false`                             | boolean      |
| `--continueOnError`   | Don't exit with a non-zero status code on lint errors    | `false`                             | boolean      |

## Global Options
| Option            | Description            |
|-------------------|------------------------|
| `--debug`         | Show debug information |
| `--help, -h`      | Show help              |
| `--version`, `-v` | Show version number    |

Display general help
```
obg-build-tools --help
```

Display help specific to a task:
```
obg-build-tools lint-sass --help
```

To display help when running the task from a mapped npm script you should omit the `--`;
```
npm run lint-sass help
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
npm run build
```

## Development utils

### Trigger watch
Handles compiling of changes.
```
npm run watch
```


Check out the [release workflow guide][releaseWorkflowWiki] in order to guide you creating a release and distributing it.