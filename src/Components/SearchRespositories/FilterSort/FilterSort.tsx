import * as React from "react";

import {
	FilterSortContainer,
	FilterSortGroup,
	SearchInput,
	SearchInputContainer,
} from "./FilterSort.styles";
import { filters, languageFilterOptions, sortInputs } from ".";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IFilterSortOption } from "src/_types";
import { SelectInput } from "../../../Components/Shared";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface Props {
	addFilter: (filterToAdd: IFilterSortOption) => void;
	changeSearchTerm: (value: string) => void;
	changeSort: (sortName: string) => void;
	filterBy: IFilterSortOption[];
	searchRepositories: () => void;
	searchTerm: string;
	sortBy: string;
}

export const FilterSort = ({
	addFilter,
	changeSearchTerm,
	changeSort,
	filterBy,
	searchRepositories,
	searchTerm,
	sortBy,
}: Props) => {
	return (
		<FilterSortContainer
			onSubmit={(e) => {
				e.preventDefault();
				searchRepositories();
			}}
		>
			<SearchInputContainer>
				<FontAwesomeIcon icon={faSearch} />
				<SearchInput
					type="text"
					placeholder="Search Repositories"
					value={searchTerm}
					onChange={(e: React.ChangeEvent) => changeSearchTerm(e.target.value)}
				/>
			</SearchInputContainer>
			<FilterSortGroup>
				<div>
					<SelectInput
						multiselect
						label="Language"
						selected={
							filterBy.find(
								(filter: IFilterSortOption) => filter.name === filters.language,
							)?.values || []
						}
						options={languageFilterOptions}
						handleChange={(selected: string[]) =>
							addFilter({ name: filters.language, values: selected })
						}
					/>
				</div>
				<div>
					<SelectInput
						label="Sort"
						selected={[sortBy]}
						options={Object.keys(sortInputs).map((key: string) => sortInputs[key])}
						handleChange={(selected: string[]) => changeSort(selected[0])}
					/>
				</div>
			</FilterSortGroup>
		</FilterSortContainer>
	);
};
