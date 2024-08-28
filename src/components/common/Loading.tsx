import { FC, PropsWithChildren, useEffect, useState } from "react";

interface Props extends PropsWithChildren {
	loading: boolean;
}

const Loading: FC<Props> = ({ loading, children }) => {
	const [ellipsis, setEllipsis] = useState("");
	const displayChildren = !loading && children;

	useEffect(() => {
		if (displayChildren) return null;

		let count = 0;

		const interval = setInterval(() => {
			count = (count % 3) + 1;
			setEllipsis(".".repeat(count));
		}, 150);

		return () => clearInterval(interval);
	}, [displayChildren]);

	return displayChildren ? (
		children
	) : (
		<div className="rounded-sm bg-gray-300 p-1">Loading{ellipsis}</div>
	);
};

export default Loading;
