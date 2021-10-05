import { FilterOption } from ".";

export interface searchReposState {
	searchTerm: string;
	filterBy: FilterOption[];
	sortBy: string;
}

export interface SearchReposReducerAction {
	type: string;
	searchTerm?: string;
}
