import {
	CHANGE_PAGE,
	GET_REPOS_SUCCESS,
	LOADING,
	RESET,
	repoReducer,
	repoReducerInitialState,
} from ".";

import { mockRepo1 } from "../../../_mocks";

test("changes page", () => {
	const pageNum = 2;
	expect(
		repoReducer(repoReducerInitialState, {
			type: CHANGE_PAGE,
			pageNum,
		}),
	).toEqual({
		...repoReducerInitialState,
		pageNum,
	});
});

test("sets repos after successful request", () => {
	const totalPages = 2;
	const repos = [mockRepo1];
	expect(
		repoReducer(repoReducerInitialState, {
			type: GET_REPOS_SUCCESS,
			repos,
			totalPages,
		}),
	).toEqual({
		...repoReducerInitialState,
		loading: false,
		repos,
		totalPages,
	});
});

test("updates loading state", () => {
	const loading = true;
	expect(
		repoReducer(repoReducerInitialState, {
			type: LOADING,
			isLoading: loading,
		}),
	).toEqual({
		...repoReducerInitialState,
		loading,
	});
});

test("resets state", () => {
	expect(
		repoReducer(repoReducerInitialState, {
			type: RESET,
		}),
	).toEqual(repoReducerInitialState);
});

test("returns default state", () => {
	expect(
		repoReducer(repoReducerInitialState, {
			type: "default",
		}),
	).toEqual(repoReducerInitialState);
});
