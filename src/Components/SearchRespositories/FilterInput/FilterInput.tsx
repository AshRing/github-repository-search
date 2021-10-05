import * as React from "react";

import { FilterInputContainer } from "./FilterInput.styles";
import { SelectInput } from "../../../Components/Shared";

interface Props {
	filterBy: string[];
	onFilterChange: (filters: string[]) => void;
}

export const FilterInput = ({ filterBy, onFilterChange }: Props) => {
	return (
		<FilterInputContainer>
			<SelectInput
				multiselect
				label="Filter"
				selected={filterBy}
				options={[]}
				handleChange={(selected: string[]) => onFilterChange(selected)}
			/>
		</FilterInputContainer>
	);
};
