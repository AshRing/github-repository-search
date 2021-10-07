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
	filters?: IFilterSortOption[];
}

export interface IRepoReducerState {
	repos: IRepository[];
	pageNum: number;
	totalPages: number;
	loading: boolean;
}

export interface IRepoReducerAction {
	type: string;
	repos?: IRepository[];
	isLoading?: boolean;
	pageNum?: number;
	totalPages?: number;
}
