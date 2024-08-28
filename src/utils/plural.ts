// simple pluralizer
export default function plural(word: string, countable: any[] | number) {
	const count = Array.isArray(countable) ? countable.length : countable;

	return count !== 1 ? `${word}s` : word;
}
