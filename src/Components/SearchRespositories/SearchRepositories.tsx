import * as React from "react";

import {
	ADD_FILTER,
	CHANGE_SEARCH_TERM,
	CHANGE_SORT,
	filterSortInitialState,
	filterSortReducer,
} from "./reducer";
import { FilterSort, sortValues } from "./FilterSort";
import { IFilterSortOption, IGetRepositoriesInput } from "src/_types";

import { SearchRepositoriesContainer } from "./SearchRepositories.styles";
import { getRepositories } from "../../_api";

export const SearchRepositories = () => {
	const [filterSortState, filterSortDispatch] = React.useReducer(
		filterSortReducer,
		filterSortInitialState,
	);

	React.useEffect(async () => {
		if (filterSortState.searchTerm !== "") {
			await searchRepositories();
		}
	}, [filterSortState.filterBy, filterSortState.sortBy]);

	const searchRepositories = async () => {
		const getReposInput: IGetRepositoriesInput = {
			searchTerm: filterSortState.searchTerm,
			filterBy: filterSortState.filterBy,
			sortByValue: sortValues[filterSortState.sortBy],
		};
		await getRepositories(getReposInput).then((res) => {
			// set results
			console.log(res);
		});
	};

	return (
		<SearchRepositoriesContainer>
			<h1>GitHub Repository Search</h1>
			<FilterSort
				addFilter={(filterToAdd: IFilterSortOption) =>
					filterSortDispatch({
						type: ADD_FILTER,
						filterName: filterToAdd.name,
						filterValues: filterToAdd.values,
					})
				}
				changeSearchTerm={(value: string) =>
					filterSortDispatch({ type: CHANGE_SEARCH_TERM, searchTerm: value })
				}
				changeSort={(sortName: string) =>
					filterSortDispatch({ type: CHANGE_SORT, sortName })
				}
				filterBy={filterSortState.filterBy}
				searchRepositories={() => searchRepositories()}
				searchTerm={filterSortState.searchTerm}
				sortBy={filterSortState.sortBy}
			/>
		</SearchRepositoriesContainer>
	);
};
