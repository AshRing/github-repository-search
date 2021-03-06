import {
	IFilterSortOption,
	IFilterSortReducerAction,
	IFilterSortReducerState,
} from "../../../_types";

import { sortInputs } from "../FilterSort";

export const ADD_FILTER = "ADD_FILTER";
export const CHANGE_SEARCH_TERM = "CHANGE_SEARCH_TERM";
export const CHANGE_SORT = "CHANGE_SORT";
export const UPDATE_FROM_QUERY = "UPDATE_FROM_QUERY";

export const filterSortInitialState: IFilterSortReducerState = {
	filterBy: [],
	searchTerm: "",
	sortBy: sortInputs.bestMatch,
};

export const filterSortReducer = (
	state = filterSortInitialState,
	action: IFilterSortReducerAction,
): IFilterSortReducerState => {
	switch (action.type) {
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
				if (action.filterValues.length === 0) {
					return {
						...state,
						filterBy: remainingFilters,
					};
				} else {
					return {
						...state,
						filterBy: [filterToAdd, ...remainingFilters],
					};
				}
			} else {
				return {
					...state,
					filterBy: [...state.filterBy, filterToAdd],
				};
			}
		case CHANGE_SEARCH_TERM:
			return { ...state, searchTerm: action.searchTerm };
		case CHANGE_SORT:
			return { ...state, sortBy: action.sortName };
		case UPDATE_FROM_QUERY:
			return {
				...state,
				sortBy: action.sortName || state.sortBy,
				searchTerm: action.searchTerm || state.searchTerm,
				filterBy: action.filters || state.filterBy,
			};
		default:
			return state;
	}
};
