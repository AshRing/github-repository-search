import * as React from "react";

import { sortInputs } from "./SortInput.bl";

interface Props {
	sortBy: string;
	onSortChange: (sortBy: string) => void;
}

export const SortInput = ({ onSortChange, sortBy }: Props) => {
	const sortOptions: string[] = Object.keys(sortInputs).map((key: string) => sortInputs[key]);

	return (
		<div>
		</div>
	);
};
