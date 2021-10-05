import * as React from "react";

import { CHANGE_SEARCH_TERM, searchReposInitialState, searchReposReducer } from "./reducer";
import {
	FilterSortContainer,
	SearchInput,
	SearchInputContainer,
	SearchRepositoriesContainer,
} from "./SearchRepositories.styles";

import { FilterInput } from "./FilterInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SortInput } from "./SortInput";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export const SearchRepositories = () => {
	const [searchReposState, searchReposDispatch] = React.useReducer(
		searchReposReducer,
		searchReposInitialState,
	);

	return (
		<SearchRepositoriesContainer>
			<h1>GitHub Repository Search</h1>
			<SearchInputContainer>
				<FontAwesomeIcon icon={faSearch} />
				<SearchInput
					type="text"
					placeholder="Search Repositories"
					value={searchReposState.searchTerm}
					onChange={(e: React.ChangeEvent) =>
						searchReposDispatch({
							type: CHANGE_SEARCH_TERM,
							searchTerm: e.target.value,
						})
					}
				/>
			</SearchInputContainer>
			<FilterSortContainer>
				<FilterInput
					filterBy={searchReposState.filterBy}
					onFilterChange={(selectedFilters: string[]) => console.log(selectedFilters)}
				/>
				<SortInput
					sortBy={searchReposState.sortBy}
					onSortChange={(selectedSort: string) => console.log(selectedSort)}
				/>
			</FilterSortContainer>
		</SearchRepositoriesContainer>
	);
};
