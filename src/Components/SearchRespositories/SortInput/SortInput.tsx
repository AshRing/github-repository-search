import * as React from "react";

import { FilterSortOption } from "../../../_types";
import { SelectInput } from "../../../Components/Shared";
import { sortInputs } from "./SortInput.bl";

interface Props {
	sortBy: string;
	onSortChange: (sortBy: string) => void;
}

export const SortInput = ({ onSortChange, sortBy }: Props) => {
	const sortOptions: FilterSortOption[] = Object.keys(sortInputs).map((key: string) => ({
		name: sortInputs[key],
		value: sortInputs[key],
	}));

	return (
		<div>
			<SelectInput
				label="Sort"
				selected={[
					sortOptions.find((sortOption: FilterSortOption) => sortOption.value === sortBy),
				]}
				options={sortOptions}
				handleChange={(selected: FilterSortOption[]) => onSortChange(selected[0].value)}
			/>
		</div>
	);
};
