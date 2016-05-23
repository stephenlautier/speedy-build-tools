import {Injectable} from "@angular/core";

@Injectable()
export class SkeletonService {

	log(logType: string, message: string, data?: any): void {
		if (data) {
			(<any>console)[logType](message, data);
		} else {
			(<any>console)[logType](message);
		}
	}
}
