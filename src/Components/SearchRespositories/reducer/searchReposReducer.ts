import { IFilterSortOption, ISearchReposReducerAction, ISearchReposState } from "../../../_types";

import { sortInputs } from "../SearchRepositories.bl";

export const CHANGE_SEARCH_TERM = "CHANGE_SEARCH_TERM";
export const ADD_FILTER = "ADD_FILTER";
export const CHANGE_SORT = "CHANGE_SORT";

export const searchReposInitialState: ISearchReposState = {
	searchTerm: "",
	filterBy: [],
	sortBy: sortInputs.bestMatch,
};

export const searchReposReducer = (
	state = searchReposInitialState,
	action: ISearchReposReducerAction,
): ISearchReposState => {
	switch (action.type) {
		case CHANGE_SEARCH_TERM:
			return { ...state, searchTerm: action.searchTerm };
		case ADD_FILTER:
			const filterToAdd: IFilterSortOption = {
				name: action.filterName,
				values: action.filterValues,
			};
			const filterExists: boolean = state.filterBy.some(
				(filter: IFilterSortOption) => filter.name === action.filterName,
			);
			if (filterExists) {
				const remainingFilters = state.filterBy.filter(
					(filter: IFilterSortOption) => filter.name !== action.filterName,
				);
				return {
					...state,
					filterBy: [filterToAdd, ...remainingFilters],
				};
			} else {
				return {
					...state,
					filterBy: [...state.filterBy, filterToAdd],
				};
			}
		case CHANGE_SORT:
			return { ...state, sortBy: action.sortName };
		default:
			return state;
	}
};
