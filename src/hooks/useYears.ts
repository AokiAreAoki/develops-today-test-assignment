"use client";

import { useMemo } from "react";
import getYears from "../utils/getYears";

export default function useYears() {
	return useMemo(getYears, []);
}
