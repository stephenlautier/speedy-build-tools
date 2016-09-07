import { TestBed, inject } from "@angular/core/testing";

import { SkeletonService } from "./skeleton.service";

describe("SkeletonService", () => {

	let skeletonService: SkeletonService;

	beforeEach(() => TestBed.configureTestingModule({
		providers: [
			SkeletonService
		]
	}));

	beforeEach(inject([
		SkeletonService
	], (_skeletonService: SkeletonService) => {
		skeletonService = _skeletonService;
	}));

	beforeEach(() => {
		spyOn(console, "log");
	});

	it("should log successfully", () => {
		let message = "Hello";
		skeletonService.log("log", message);
		expect(console.log).toHaveBeenCalledWith(message);
	});
});