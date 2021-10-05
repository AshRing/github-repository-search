import * as React from "react";

import {
	ADD_FILTER,
	CHANGE_SEARCH_TERM,
	CHANGE_SORT,
	searchReposInitialState,
	searchReposReducer,
} from "./reducer";
import {
	FilterSortContainer,
	SearchInput,
	SearchInputContainer,
	SearchRepositoriesContainer,
} from "./SearchRepositories.styles";
import { IFilterSortOption, IGetRepositoriesInput, IRepository } from "src/_types";
import { filters, languageFilterOptions, sortValues } from "./SearchRepositories.bl";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SelectInput } from "../Shared";
import { SortInput } from "./SortInput";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { getRepositories } from "../../_api";

export const SearchRepositories = () => {
	const [searchReposState, searchReposDispatch] = React.useReducer(
		searchReposReducer,
		searchReposInitialState,
	);

	React.useEffect(async () => {
		if (searchReposState.searchTerm !== "") {
			await searchRepositories();
		}
	}, [searchReposState.filterBy, searchReposState.sortBy]);

	const searchRepositories = async () => {
		const getReposInput: IGetRepositoriesInput = {
			searchTerm: searchReposState.searchTerm,
			filterBy: searchReposState.filterBy,
			sortByValue: sortValues[searchReposState.sortBy],
		};
		await getRepositories(getReposInput).then((res) => {
			// set results
			console.log(res);
		});
	};

	return (
		<SearchRepositoriesContainer>
			<h1>GitHub Repository Search</h1>
			<form
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
					<div>
						<SelectInput
							multiselect
							label="Language"
							selected={
								searchReposState.filterBy.find(
									(filter: IFilterSortOption) => filter.name === filters.language,
								)?.values || []
							}
							options={languageFilterOptions}
							handleChange={(selected: string[]) =>
								searchReposDispatch({
									type: ADD_FILTER,
									filterName: filters.language,
									filterValues: selected,
								})
							}
						/>
					</div>
					<SortInput
						sortBy={searchReposState.sortBy}
						onSortChange={(selectedSort: string) =>
							searchReposDispatch({
								type: CHANGE_SORT,
								sortName: selectedSort,
							})
						}
					/>
				</FilterSortContainer>
			</form>
		</SearchRepositoriesContainer>
	);
};
