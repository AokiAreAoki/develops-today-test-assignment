'use client'

import { useMemo, useState } from "react";
import Option from "../../types/Option";
import Dropdown from "../common/dropdown";
import { MakeWithVehicleType } from "../../types/Make";
import makeLookupTable from "../../utils/makeLookupTable";
import useMakes from "../../hooks/useMakes";
import useYears from "../../hooks/useYears";
import Loading from "../common/Loading";
import CustomLink from "../common/CustomLink";

function MakeAndYearSelect() {
	const [makeId, setMakeId] = useState<string | null>(null)
	const [year, setYear] = useState<number | null>(null)
	const { loading, makes } = useMakes()
	const years = useYears()

	const lookup = useMemo(() => (makes
		? makeLookupTable(makes, make => make.makeId, true)
		: {}
	), [makes])

	const makeOptions = useMemo((): Option[] => {
		return makes?.map(make => ({
			key: make.makeId,
			label: make.makeName + ' - ' + make.vehicleTypeName,
		})) || []
	}, [makes])

	const yearOptions = useMemo((): Option[] => {
		return years.map(year => ({ key: year, label: year }))
	}, [years])

	const make = useMemo(() => lookup[makeId]?.value as (MakeWithVehicleType | undefined), [lookup, makeId])
	const canNext = Boolean(make && year)

	const href = useMemo(() => (canNext
		? `result/${makeId}/${year}`
		: ''
	), [canNext, makeId, year])

	return (
		<Loading loading={loading}>
			<div className="flex flex-col p-6 gap-3 bg-gray-200 rounded-3xl overflow-hidden">
				<div className="flex flex-col gap-1">
					<label>Select make:</label>
					<Dropdown
						value={makeId}
						onChange={setMakeId}
						options={makeOptions}
					/>
				</div>

				<div className="flex flex-col gap-1">
					<label>Select year:</label>
					<Dropdown
						value={year}
						onChange={setYear}
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

export default MakeAndYearSelect