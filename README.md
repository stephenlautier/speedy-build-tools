[projectUri]: https://bitbucketsson.betsson.local/projects/WF/repos/obg.ng2.sdk.skeleton
[projectGit]: https://bitbucketsson.betsson.local/scm/wf/obg.ng2.sdk.skeleton.git
[changeLog]: ./doc/CHANGELOG.md

[contribWiki]: https://wikisson.betsson.local/display/SG/Contribution+Guidelines
[releaseWorkflowWiki]: https://wikisson.betsson.local/display/SG/Prepare+new+Release+for+Library
[setupMachineWiki]: https://wikisson.betsson.local/display/SG/Setup+Machine+for+Development+-+Libraries

# obg.ng2.sdk.skeleton
OBG angular2 skeleton setup for sdk global, utils, services, providers and client


**Quick links**

[Change logs][changeLog] | [Project Repository][projectUri] | [Contribution guidelines][contribWiki]

# Getting Started

## Installation

```
npm install @obg/ng2.sdk.skeleton --save
```

# Usage

## Register providers

```ts
import { SKELETON_PROVIDERS } from "@obg/ng2.sdk.skeleton";

// within bootstrap or AppComponent
providers: [
	SKELETON_PROVIDERS
]
```

```ts
import { SkeletonService } from "@obg/ng2.sdk.skeleton";

@Injectable()
constructor(
	private skeletonService: SkeletonService
) {
}

// get
skeletonService.get("http://xxx/:id", {
	id: "lobby"
});

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

## Running the tests

```
gulp test
```


## Development utils

### Trigger gulp watch
Handles compiling of changes.
```
gulp watch
```


### Running Continuous Tests
Spawns test runner and keep watching for changes.
```
gulp tdd
```

### Link package
*NPM Link + Typings install*
```bash
npm run obg-link ng2.common
```


## Preparation for Release

```
gulp prepare-release --bump major|minor|patch|prerelease (default: patch) --version-suffix beta (default: rc - only applies to prerelease)
```
Check out the [release workflow guide][releaseWorkflowWiki] in order to guide you creating a release and distributing it.