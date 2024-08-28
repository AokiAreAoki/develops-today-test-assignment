const MIN_YEAR = 2015

export default function getYears() {
	const currentYear = new Date().getFullYear()
	const years = []

	for (let year = MIN_YEAR; year <= currentYear; ++year) {
		years.push(year)
	}

	return years
}