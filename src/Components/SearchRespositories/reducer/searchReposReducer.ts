import { SearchReposReducerAction, searchReposState } from "../../../_types";

import { sortInputs } from "../SortInput/SortInput.bl";

export const CHANGE_SEARCH_TERM = "CHANGE_SEARCH_TERM";

export const searchReposInitialState: searchReposState = {
	searchTerm: "",
	filterBy: [],
	sortBy: sortInputs.bestMatch,
};

export const searchReposReducer = (
	state = searchReposInitialState,
	action: SearchReposReducerAction,
): searchReposState => {
	switch (action.type) {
		case CHANGE_SEARCH_TERM:
			return { ...state, searchTerm: action.searchTerm };
		default:
			return state;
	}
};
