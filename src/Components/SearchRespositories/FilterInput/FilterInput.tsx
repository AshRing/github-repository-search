import * as React from "react";

import { FilterInputContainer } from "./FilterInput.styles";
import { FilterSortOption } from "../../../_types";
import { SelectInput } from "../../../Components/Shared";

interface Props {
	filterBy: FilterSortOption[];
	onFilterChange: (filters: FilterSortOption[]) => void;
}

export const FilterInput = ({ filterBy, onFilterChange }: Props) => {
	return (
		<FilterInputContainer>
			<SelectInput
				multiselect
				label="Filter"
				selected={filterBy}
				options={[]}
				handleChange={(selected: FilterSortOption[]) => onFilterChange(selected)}
			/>
		</FilterInputContainer>
	);
};
