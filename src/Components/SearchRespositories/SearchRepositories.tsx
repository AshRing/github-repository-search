import * as React from "react";

import {
	ADD_FILTER,
	CHANGE_PAGE,
	CHANGE_SEARCH_TERM,
	CHANGE_SORT,
	GET_REPOS_SUCCESS,
	LOADING,
	RESET,
	UPDATE_FROM_QUERY,
	filterSortInitialState,
	filterSortReducer,
	repoReducer,
	repoReducerInitialState,
} from "./reducers";
import { FilterSort, sortValues } from "./FilterSort";
import { IFilterSortOption, IGetRepositoriesInput } from "../../_types";
import { ScrollToTopButton, SearchRepositoriesContainer } from "./SearchRepositories.styles";
import { getFiltersInQuery, updateQueryParam } from "./SearchRepositories.bl";
import { useHistory, useLocation } from "react-router-dom";

import { AppWrapper } from "../App.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RepoList } from "./RepoList";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { getRepositories } from "../../_api";
import { useQuery } from "../../_hooks";

export const SearchRepositories = () => {
	const [filterSortState, filterSortDispatch] = React.useReducer(
		filterSortReducer,
		filterSortInitialState,
	);
	const [repoState, repoDispatch] = React.useReducer(repoReducer, repoReducerInitialState);
	const [showScrollToTopBtn, toggleScrollToTopBtn] = React.useState<boolean>(false);
	const filterSortRef: React.RefObject<HTMLDivElement> = React.useRef();
	const history = useHistory();
	const location = useLocation();
	const queryParams = useQuery();

	React.useEffect(async () => {
		// apply values from query params
		if (queryParams.toString().length) {
			if (queryParams.get("pageNum") !== repoState.pageNum) {
				repoDispatch({ type: CHANGE_PAGE, pageNum: parseInt(queryParams.get("pageNum")) });
			}
			const filtersInQuery: IFilterSortOption[] = getFiltersInQuery(queryParams);
			filterSortDispatch({
				type: UPDATE_FROM_QUERY,
				sortName: queryParams.get("sortBy"),
				filters: filtersInQuery,
				searchTerm: queryParams.get("searchTerm"),
			});
			if (queryParams.has("searchTerm")) {
				await searchRepositories({
					searchTerm: queryParams.get("searchTerm"),
					filterBy: filtersInQuery,
					sortByValue: queryParams.get("sortBy"),
					pageNum: parseInt(queryParams.get("pageNum")),
				});
			}
		}
	}, []);

	React.useEffect(() => {
		// show scroll to top button after scrolling past the search/filters/sorts
		const observerOptions = {
			root: null,
			rootMargin: "0px",
			threshold: 0,
		};
		const observer = new IntersectionObserver(
			([entry]) => toggleScrollToTopBtn(!entry.isIntersecting),
			observerOptions,
		);
		if (filterSortRef.current) {
			observer.observe(filterSortRef.current);
		}

		return () => {
			if (filterSortRef.current) {
				observer.unobserve(filterSortRef.current);
			}
		};
	}, [filterSortRef]);

	React.useEffect(() => {
		if (filterSortState.searchTerm === "") {
			updateQueryParam(
				location.search,
				"searchTerm",
				(paramsToSave: string) => history.replace({ search: paramsToSave }),
				[],
			);
			repoDispatch({ type: RESET });
		}
	}, [filterSortState.searchTerm]);

	React.useEffect(async () => {
		if (filterSortState.searchTerm !== "") {
			await searchRepositories();
		}
	}, [filterSortState.filterBy, filterSortState.sortBy, repoState.pageNum]);

	const searchRepositories = async (input?: IGetRepositoriesInput) => {
		repoDispatch({
			type: LOADING,
			isLoading: true,
		});
		const getReposInput: IGetRepositoriesInput = {
			searchTerm: input?.searchTerm || filterSortState.searchTerm,
			filterBy: input?.filterBy || filterSortState.filterBy,
			sortByValue: sortValues[input?.sortByValue || filterSortState.sortBy],
			pageNum: input?.pageNum || repoState.pageNum,
		};
		await getRepositories(getReposInput).then((res) => {
			const itemsPerPage = 30;
			const itemsAvailable = res.total_count < 1000 ? res.total_count : 1000;
			repoDispatch({
				type: GET_REPOS_SUCCESS,
				repos: res.items,
				totalPages: Math.floor(itemsAvailable / itemsPerPage),
			});
		});
	};

	return (
		<SearchRepositoriesContainer>
			<AppWrapper>
				<h1>GitHub Repository Search</h1>
				<div ref={filterSortRef}>
					<FilterSort
						addFilter={(filterToAdd: IFilterSortOption) => {
							updateQueryParam(
								location.search,
								filterToAdd.name,
								(paramsToSave: string) => history.replace({ search: paramsToSave }),
								filterToAdd.values,
							);
							filterSortDispatch({
								type: ADD_FILTER,
								filterName: filterToAdd.name,
								filterValues: filterToAdd.values,
							});
						}}
						changeSearchTerm={(value: string) => {
							updateQueryParam(
								location.search,
								"searchTerm",
								(paramsToSave: string) => history.replace({ search: paramsToSave }),
								[value],
							);
							filterSortDispatch({ type: CHANGE_SEARCH_TERM, searchTerm: value });
						}}
						changeSort={(sortName: string) => {
							updateQueryParam(
								location.search,
								"sortBy",
								(paramsToSave: string) => history.replace({ search: paramsToSave }),
								[sortName],
							);
							filterSortDispatch({ type: CHANGE_SORT, sortName });
						}}
						filterBy={filterSortState.filterBy}
						searchRepositories={() => searchRepositories()}
						searchTerm={filterSortState.searchTerm}
						sortBy={filterSortState.sortBy}
					/>
				</div>
				<RepoList
					changePage={(pageNum: number) => {
						updateQueryParam(
							location.search,
							"pageNum",
							(paramsToSave: string) => history.replace({ search: paramsToSave }),
							[pageNum.toString()],
						);
						repoDispatch({ type: CHANGE_PAGE, pageNum });
					}}
					filterSortState={filterSortState}
					pageNum={repoState.pageNum}
					repos={repoState.repos}
					reposLoading={repoState.loading}
					totalPages={repoState.totalPages}
				/>
				{showScrollToTopBtn && (
					<ScrollToTopButton onClick={() => window.scrollTo(0, 0)}>
						<FontAwesomeIcon icon={faArrowUp} /> <span>Back to Top</span>
					</ScrollToTopButton>
				)}
			</AppWrapper>
		</SearchRepositoriesContainer>
	);
};
