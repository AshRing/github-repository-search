import {
	ADD_FILTER,
	CHANGE_SEARCH_TERM,
	CHANGE_SORT,
	UPDATE_FROM_QUERY,
	filterSortInitialState,
	filterSortReducer,
} from ".";
import { filters, sortInputs } from "../FilterSort";

import { IFilterSortOption } from "src/_types";

test("adds filter to reducer state if it doesn't exist", () => {
	const languageFilter: IFilterSortOption = { name: filters.language, values: ["HTML"] };
	expect(
		filterSortReducer(filterSortInitialState, {
			type: ADD_FILTER,
			filterName: languageFilter.name,
			filterValues: languageFilter.values,
		}),
	).toEqual({
		...filterSortInitialState,
		filterBy: [languageFilter],
	});
});

test("updates filter in reducer state if it already exist and values are added", () => {
	const initialLanguageFilter: IFilterSortOption = { name: filters.language, values: ["HTML"] };
	const filterAfterUpdate: IFilterSortOption = {
		name: filters.language,
		values: [...initialLanguageFilter.values, "CSS"],
	};
	const testInitialState = {
		...filterSortInitialState,
		filterBy: [initialLanguageFilter],
	};
	expect(
		filterSortReducer(testInitialState, {
			type: ADD_FILTER,
			filterName: initialLanguageFilter.name,
			filterValues: filterAfterUpdate.values,
		}),
	).toEqual({
		...filterSortInitialState,
		filterBy: [filterAfterUpdate],
	});
});

test("removes filter in reducer state if it exists, but values become empty", () => {
	const initialLanguageFilter: IFilterSortOption = { name: filters.language, values: ["HTML"] };
	const testInitialState = {
		...filterSortInitialState,
		filterBy: [initialLanguageFilter],
	};
	expect(
		filterSortReducer(testInitialState, {
			type: ADD_FILTER,
			filterName: initialLanguageFilter.name,
			filterValues: [],
		}),
	).toEqual({
		...filterSortInitialState,
		filterBy: [],
	});
});

test("changes search term", () => {
	const searchTerm = "test";
	expect(
		filterSortReducer(filterSortInitialState, {
			type: CHANGE_SEARCH_TERM,
			searchTerm,
		}),
	).toEqual({
		...filterSortInitialState,
		searchTerm,
	});
});

test("changes sort", () => {
	const sortName = sortInputs.stars;
	expect(
		filterSortReducer(filterSortInitialState, {
			type: CHANGE_SORT,
			sortName,
		}),
	).toEqual({
		...filterSortInitialState,
		sortBy: sortName,
	});
});

test("updates reducer state with query string items", () => {
	const sortName = sortInputs.stars;
	const searchTerm = "test";
	const languageFilter: IFilterSortOption = { name: filters.language, values: ["HTML"] };
	expect(
		filterSortReducer(filterSortInitialState, {
			type: UPDATE_FROM_QUERY,
			sortName,
			searchTerm,
			filters: [languageFilter],
		}),
	).toEqual({
		...filterSortInitialState,
		sortBy: sortName,
		searchTerm,
		filterBy: [languageFilter],
	});
});

test("returns reducer state by default", () => {
	expect(
		filterSortReducer(filterSortInitialState, {
			type: "default",
		}),
	).toEqual(filterSortInitialState);
});
