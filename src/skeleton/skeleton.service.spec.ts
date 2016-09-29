import { TestBed } from "@angular/core/testing";

import { SkeletonService } from "./skeleton.service";

describe("SkeletonService", () => {

	let skeletonService: SkeletonService;

	beforeEach(() => TestBed.configureTestingModule({
		providers: [
			SkeletonService
		]
	}));

	beforeEach(() => {
		skeletonService = TestBed.get(SkeletonService);
	});

	beforeEach(() => {
		spyOn(console, "log");
	});

	it("should log successfully", () => {
		let message = "Hello";
		skeletonService.log("log", message);
		expect(console.log).toHaveBeenCalledWith(message);
	});
});