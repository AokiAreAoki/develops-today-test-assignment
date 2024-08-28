"use client";

import { useEffect, useState } from "react";
import APIService from "../services/API";
import { MakeWithVehicleType } from "../types/Make";

export default function useMakes() {
	const [loading, setLoading] = useState(false);
	const [makes, setMakes] = useState<MakeWithVehicleType[] | null>(null);

	useEffect(() => {
		async function fetchMakes(): Promise<void> {
			const makesResponse = await APIService.getMakesForVehicleType();

			if (!makesResponse.success) {
				console.error(makesResponse.error);
				return [];
			}

			setMakes(makesResponse.data);
			setLoading(false);
		}

		setLoading(true);
		fetchMakes();
	}, []);

	return { loading, makes };
}
