import { FC } from "react";

type Value = string;

interface Props {
	value: Value;
}

const ErrorMessage: FC<Props> = ({ value }) => (
	<div
		className="
			border-solid border-red-600 border-2 rounded-2xl
			text-xl text-red-600
			bg-red-600 bg-opacity-25 p-2
		"
	>
		{value || "Error"}
	</div>
);

export default ErrorMessage;
