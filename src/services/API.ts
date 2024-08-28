import Model from "../types/Model";
import { Make, MakeWithVehicleType } from "../types/Make";
import { APIResponse } from "../types/APIResponse";
import wrapAPIResponse from "../utils/wrapAPIResponse";

export default class APIService {
	static endpoints = {
		getAllMakes: () =>
			`https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json`,
		getMakesForVehicleType: (vehicleType: string) =>
			`https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/${vehicleType}?format=json`,
		getModelsForMakeIdYear: (makeId: number, year: number) =>
			`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`,
	};

	static async getAllMakes(): APIResponse<Make[]> {
		try {
			const data = await fetch(this.endpoints.getAllMakes());
			const json = await data.json();
			const results = (json.Results || []) as any[];

			return wrapAPIResponse(
				results.map((make) => ({
					makeId: make.Make_ID,
					makeName: make.Make_Name,
				})),
			);
		} catch (error) {
			return wrapAPIResponse(error as Error, true);
		}
	}

	static async getMakesForVehicleType(
		vehicleType: string = "car",
	): APIResponse<MakeWithVehicleType[]> {
		try {
			const data = await fetch(
				this.endpoints.getMakesForVehicleType(vehicleType),
			);
			const json = await data.json();
			const results = (json.Results || []) as any[];

			return wrapAPIResponse(
				results.map((make) => ({
					makeId: make.MakeId,
					makeName: make.MakeName,
					vehicleTypeId: make.VehicleTypeId,
					vehicleTypeName: make.VehicleTypeName,
				})),
			);
		} catch (error) {
			return wrapAPIResponse(error as Error, true);
		}
	}

	static async getModelsForMakeIdYear(
		makeId: string | number,
		year: string | number,
	): APIResponse<Model[]> {
		try {
			const data = await fetch(
				this.endpoints.getModelsForMakeIdYear(makeId, year),
			);
			const json = await data.json();
			const results = (json.Results || []) as any[];

			return wrapAPIResponse(
				results.map((model) => ({
					makeId: model.Make_ID,
					makeName: model.Make_Name,
					modelId: model.Model_ID,
					modelName: model.Model_Name,
				})),
			);
		} catch (error) {
			return wrapAPIResponse(error as Error, true);
		}
	}
}
