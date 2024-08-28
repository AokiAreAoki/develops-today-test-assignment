import { Key } from "react";

interface Wrapper<K, V> {
	key: K;
	value: V;
}

export type Lookup<T, K extends Key, U extends boolean | undefined> = Record<
	K,
	Wrapper<K, U extends true ? T : T[]>
>;

export default function makeLookupTable<
	T,
	K extends Key,
	U extends boolean | undefined,
>(
	items: T[],
	// eslint-disable-next-line no-unused-vars
	getKey: (item: T) => K,
	keyIsUnique: U,
) {
	const lookup: Partial<Lookup<T, K, U>> = {};

	if (keyIsUnique) {
		// U is true
		items.forEach((item) => {
			const key = getKey(item);
			(lookup as Lookup<T, K, true>)[key] = { key, value: item };
		});
	} else {
		// U is false
		items.forEach((item) => {
			const key = getKey(item);
			(lookup as Lookup<T, K, false>)[key] ??= { key, value: [] };
			(lookup as Lookup<T, K, false>)[key]!.value.push(item);
		});
	}

	return lookup as Lookup<T, K, U>;
}
