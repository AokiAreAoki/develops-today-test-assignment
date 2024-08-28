import { ChangeEvent, FC, Key, useCallback } from "react";
import Option from "../../types/Option";

const NOT_SELECTED = "--";

type Value = Key | null | undefined;

interface Props {
	value: Value;
	onChange: (value: Value) => void;
	options: Option[];
}

const Dropdown: FC<Props> = ({ value, onChange, options }) => {
	const handleChange = useCallback(
		(e: ChangeEvent<HTMLSelectElement>) => {
			const key = e.target.value;
			onChange(key !== NOT_SELECTED ? key : null);
		},
		[onChange],
	);

	return (
		<select value={value || NOT_SELECTED} onChange={handleChange}>
			<option value={NOT_SELECTED}>{NOT_SELECTED}</option>

			{options.map(({ key, label }) => (
				<option key={key} value={key}>
					{label}
				</option>
			))}
		</select>
	);
};

export default Dropdown;
