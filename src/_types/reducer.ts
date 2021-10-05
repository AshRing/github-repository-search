import { IFilterSortOption, IRepository } from ".";

export interface IFilterSortReducerState {
	searchTerm: string;
	filterBy: IFilterSortOption[];
	sortBy: string;
}

export interface IFilterSortReducerAction {
	type: string;
	searchTerm?: string;
	filterName?: string;
	filterValues?: string[];
	sortName?: string;
}
