// simple pluralizer
export default function plural(word: string, countable: any[] | number) {
	const count = Array.isArray(countable)
		? countable.length
		: countable

	if (count !== 1)
		return word + 's'

	return word
}