"use client";

import { useCallback, useMemo, useState } from "react";
import Option from "../../types/Option";
import Dropdown, { Value as DropdownValue } from "../common/Dropdown";
import makeLookupTable from "../../utils/makeLookupTable";
import useMakes from "../../hooks/useMakes";
import useYears from "../../hooks/useYears";
import Loading from "../common/Loading";
import CustomLink from "../common/CustomLink";

function MakeAndYearSelect() {
	const [makeId, setMakeId] = useState<string | null>(null);
	const [year, setYear] = useState<number | null>(null);
	const { loading, makes } = useMakes();
	const years = useYears();

	const lookup = useMemo(() => {
		if (!makes) return {};
		return makeLookupTable(makes, (make) => make.makeId, true);
	}, [makes]);

	const makeOptions = useMemo((): Option[] => {
		if (!makes) return [];

		return makes.map((make) => ({
			key: make.makeId,
			label: `${make.makeName} - ${make.vehicleTypeName}`,
		}));
	}, [makes]);

	const yearOptions = useMemo(
		(): Option[] => years.map((y) => ({ key: y, label: String(y) })),
		[years],
	);

	const make = useMemo(
		() => (makeId ? lookup[makeId].value : null),
		[lookup, makeId],
	);
	const canNext = Boolean(make && year);

	const href = useMemo(
		() => (canNext ? `result/${makeId}/${year}` : ""),
		[canNext, makeId, year],
	);

	const handleMakeId = useCallback((key: DropdownValue) => {
		setMakeId(key != null ? String(key) : null);
	}, []);

	const handleYear = useCallback((key: DropdownValue) => {
		setYear(key != null ? Number(key) : null);
	}, []);

	return (
		<Loading loading={loading}>
			<div className="flex flex-col p-6 gap-3 bg-gray-200 rounded-3xl overflow-hidden">
				<div className="flex flex-col gap-1">
					<label>Select make:</label>
					<Dropdown
						value={makeId}
						onChange={handleMakeId}
						options={makeOptions}
					/>
				</div>

				<div className="flex flex-col gap-1">
					<label>Select year:</label>
					<Dropdown
						value={year}
						onChange={handleYear}
						options={yearOptions}
					/>
				</div>

				<div className="flex flex-col items-end">
					<CustomLink href={href} disabled={!canNext}>
						Next
					</CustomLink>
				</div>
			</div>
		</Loading>
	);
}

export default MakeAndYearSelect;
