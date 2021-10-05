import * as React from "react";

import { SelectInput } from "../../../Components/Shared";
import { sortInputs } from "../SearchRepositories.bl";

interface Props {
	sortBy: string;
	onSortChange: (sortBy: string) => void;
}

export const SortInput = ({ onSortChange, sortBy }: Props) => {
	const sortOptions: string[] = Object.keys(sortInputs).map((key: string) => sortInputs[key]);

	return (
		<div>
			<SelectInput
				label="Sort"
				selected={[sortBy]}
				options={sortOptions}
				handleChange={(selected: string[]) => onSortChange(selected[0])}
			/>
		</div>
	);
};
