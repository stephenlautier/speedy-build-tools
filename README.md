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

# NPM Scripts

Instead of depending on external task runners, Obg Build Tools can be configured to being executed from npm scripts.

```json
"scripts": {
    "link": "obg-build-tools link",
    "sync": "obg-build-tools sync-dependencies"
},
````

To run the build script found in the package.json scripts property, execute:

```
npm run sync
```


# Tasks

| Task                | Description                                            |
|---------------------|--------------------------------------------------------|
| `clean`             | Delete files and directories                           |
| `sync-dependencies` | Sync dependencies between projects                     |
| `link`              | Link to an OBG Library. Don’t provide the @obg/ prefix |
| `lint-sass`         | Lint Sass files                                        |
| `lint-ts`           | Lint Typescipt files                                   |

___

## Clean

```
speedy-build-tools clean --paths .tmp/**
```

| Option        | Description                                   | Type  |
|---------------|-----------------------------------------------|-------|
| `--paths, -p` | Paths to be deleted  - Supports glob patterns | Array |

___

## Lint Sass

```
obg-build-tools lint-sass
```

| Option              | Description                                                           | Default Value           | Type    |
|---------------------|-----------------------------------------------------------------------|-------------------------|---------|
| `--config, -c`      | Lint rules file path                                                  | `.stylelintrc`          | string  |
| `--files, -f`       | Files to be linted - Supports glob patterns                           | `src/**/*.*(scss|sass)` | Array   |
| `--formatter`       | Formatter to use to format the linter results                         | `verbose`               | string  |
| `--fix`             | Determines whether to auto fix lint issues (which support fixing)     | `false`                 | boolean |
| `--continueOnError` | Determines whether to exit with a non-zero status code on lint errors | `false`                 | boolean |

### Rules
By default, it will try to locate the `.stylelintrc` file in the root of your project folder. If the file is not found it will fallback to an internal `.stylelintrc`. This file can also be used as a base for your rules.
___

## Lint Typescript

```
obg-build-tools lint-ts
```

| Option              | Description                                                           | Default Value | Type    |
|---------------------|-----------------------------------------------------------------------|---------------|---------|
| `--config, -c`      | Lint rules file path                                                  | `tslint.json` | string  |
| `--files, -f`       | Files to be linted - Supports glob patterns                           | `src/**/*.ts` | Array   |
| `--formatter`       | Formatter to use to format the linter results                         | `stylish`     | string  |
| `--fix`             | Determines whether to auto fix lint issues (which support fixing)     | `false`       | boolean |
| `--continueOnError` | Determines whether to exit with a non-zero status code on lint errors | `false`       | boolean |

### Rules
By default, it will try to locate the `tslint.json` file in the root of your project folder. If the file is not found it will fallback to an internal `tslint.json`. This file can also be used as a base for your rules.

___

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