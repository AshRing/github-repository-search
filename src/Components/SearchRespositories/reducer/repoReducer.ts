import { IRepoReducerAction, IRepoReducerState } from "../../../_types";

export const GET_REPOS_SUCCESS = "CHANGE_SEARCH_TERM";
export const CHANGE_PAGE = "CHANGE_PAGE";
export const LOADING = "LOADING";

export const repoReducerInitialState: IRepoReducerState = {
	repos: [],
	pageNum: 1,
	loading: false,
};

export const repoReducer = (
	state = repoReducerInitialState,
	action: IRepoReducerAction,
): IRepoReducerState => {
	switch (action.type) {
		case GET_REPOS_SUCCESS:
			return { ...state, repos: action.repos };
		case CHANGE_PAGE:
			return { ...state, pageNum: action.pageNum };
		case LOADING:
			return { ...state, loading: action.isLoading };
		default:
			return state;
	}
};
