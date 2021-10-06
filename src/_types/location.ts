import { IFilterSortReducerState, IRepository } from ".";

export interface ILocationState {
	repo?: IRepository;
	filterSortState: IFilterSortReducerState;
	pageNum: number;
}
