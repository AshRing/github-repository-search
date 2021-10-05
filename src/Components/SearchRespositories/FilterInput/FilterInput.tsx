import * as React from "react";

import { FilterInputContainer } from "./FilterInput.styles";

interface Props {
	filterBy: string[];
	onFilterChange: (filters: string[]) => void;
}

export const FilterInput = ({ filterBy, onFilterChange }: Props) => {
	return (
		<FilterInputContainer>
		</FilterInputContainer>
	);
};
