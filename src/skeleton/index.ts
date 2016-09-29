import { Provider } from "@angular/core";

import { SkeletonService } from "./skeleton.service";

export * from "./skeleton.service";

export const SKELETON_PROVIDERS: Provider[] = [
	SkeletonService
];