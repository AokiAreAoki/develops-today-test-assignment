export interface Make {
	makeId: number;
	makeName: string;
}

export interface MakeWithVehicleType extends Make {
	vehicleTypeId: number;
	vehicleTypeName: string;
}
