import {
	it,
	inject,
	describe,
	expect,
	beforeEach,
	beforeEachProviders
} from "@angular/core/testing";
import {SkeletonService} from "./skeleton.service";

export function main() {
	describe("SkeletonService", () => {
		beforeEachProviders(() => [SkeletonService]);
		beforeEach(() => {
			spyOn(console, "log");
		});

		it("should log successfully", inject([
			SkeletonService
		], (logger: SkeletonService) => {
			let message = "Hello";
			logger.log("log", message);
			expect(console.log).toHaveBeenCalledWith(message);
		}));
	});

}