import { IRepoReducerAction, IRepoReducerState } from "../../../_types";

export const CHANGE_PAGE = "CHANGE_PAGE";
export const GET_REPOS_SUCCESS = "GET_REPOS_SUCCESS";
export const LOADING = "LOADING";
export const RESET = "RESET";

export const repoReducerInitialState: IRepoReducerState = {
	loading: false,
	pageNum: 1,
	repos: undefined,
	totalPages: 1,
};

export const repoReducer = (
	state = repoReducerInitialState,
	action: IRepoReducerAction,
): IRepoReducerState => {
	switch (action.type) {
		case CHANGE_PAGE:
			return { ...state, pageNum: action.pageNum };
		case GET_REPOS_SUCCESS:
			return { ...state, repos: action.repos, totalPages: action.totalPages, loading: false };
		case LOADING:
			return { ...state, loading: action.isLoading };
		case RESET:
			return repoReducerInitialState;
		default:
			return state;
	}
};
