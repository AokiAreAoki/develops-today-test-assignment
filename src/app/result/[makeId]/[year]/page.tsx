import CustomLink from "../../../../components/common/CustomLink";
import ErrorMessage from "../../../../components/common/ErrorMessage";
import APIService from "../../../../services/API";
import getYears from "../../../../utils/getYears";
import makeLookupTable from "../../../../utils/makeLookupTable";
import plural from "../../../../utils/plural";

interface StaticParams {
	makeId: string;
	year: string;
}

export async function generateStaticParams(): Promise<StaticParams[]> {
	const response = await APIService.getMakesForVehicleType();

	if (!response.success) {
		console.error(response.error);
		return [];
	}

	const makes = response.data;
	const years = getYears();

	return years
		.map((year) =>
			makes.map(({ makeId }) => ({
				makeId: makeId.toString(),
				year: year.toString(),
			})),
		)
		.flat();
}

interface Props {
	params: StaticParams;
}

export default async function Page({ params }: Props) {
	const { makeId, year } = params;

	const [makesResponse, modelsResponse] = await Promise.all([
		APIService.getAllMakes(),
		APIService.getModelsForMakeIdYear(makeId, year),
	]);

	if (!makesResponse.success || !modelsResponse.success) {
		return [makesResponse, modelsResponse]
			.filter((r) => !r.success)
			.map(({ error }) => {
				console.error(error);
				const { message } = error;

				return <ErrorMessage key={message} value={message} />;
			});
	}

	const makes = makesResponse.data;
	const models = modelsResponse.data;
	const lookup = makeLookupTable(makes, (make) => make.makeId, true);

	return (
		<>
			<div className="flex flex-row-reverse justify-between items-start flex-wrap">
				<CustomLink href="/">Home</CustomLink>
				<h1 className="flex-grow font-bold text-5xl">
					{lookup[makeId]?.value?.makeName || "Unknown make"}
				</h1>
			</div>

			<h2 className="font-bold text-xl">Year: {year || "unknown"}</h2>

			<div>
				<label className="font-bold">
					Has {models.length} {plural("model", models)}:
				</label>

				<ul className="list-disc list-inside pl-1">
					{models.length === 0 ? (
						<li>No models available</li>
					) : (
						models.map((model) => (
							<li key={model.modelId}>{model.modelName}</li>
						))
					)}
				</ul>
			</div>
		</>
	);
}
