import { IFilterSortOption } from ".";

export interface ISearchReposState {
	searchTerm: string;
	filterBy: IFilterSortOption[];
	sortBy: string;
}

export interface ISearchReposReducerAction {
	type: string;
	searchTerm?: string;
	filterName?: string;
	filterValues?: string[];
	sortName?: string;
}
