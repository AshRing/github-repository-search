import * as React from "react";

import {
	ADD_FILTER,
	CHANGE_PAGE,
	CHANGE_SEARCH_TERM,
	CHANGE_SORT,
	GET_REPOS_SUCCESS,
	RESET,
	filterSortInitialState,
	filterSortReducer,
	repoReducer,
	repoReducerInitialState,
} from "./reducers";
import { FilterSort, sortValues } from "./FilterSort";
import { IFilterSortOption, IGetRepositoriesInput, ILocationState } from "../../_types";
import { ScrollToTopButton, SearchRepositoriesContainer } from "./SearchRepositories.styles";

import { AppWrapper } from "../App.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RepoList } from "./RepoList";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { getRepositories } from "../../_api";
import { useLocation } from "react-router-dom";

export const SearchRepositories = () => {
	const [filterSortState, filterSortDispatch] = React.useReducer(
		filterSortReducer,
		filterSortInitialState,
	);
	const [repoState, repoDispatch] = React.useReducer(repoReducer, repoReducerInitialState);
	const [showScrollToTopBtn, toggleScrollToTopBtn] = React.useState<boolean>(false);
	const filterSortRef: React.RefObject<HTMLDivElement> = React.useRef();
	const { state }: { state: ILocationState } = useLocation();

	React.useEffect(async () => {
		// apply previous filters
		if (state) {
			if (state.pageNum !== repoState.pageNum) {
				repoDispatch({ type: CHANGE_PAGE, pageNum: state.pageNum });
			}

			if (state.filterSortState?.filterBy.length > 0) {
				state.filterSortState.filterBy.forEach((filter: IFilterSortOption) =>
					filterSortDispatch({
						type: ADD_FILTER,
						filterName: filter.name,
						filterValues: filter.values,
					}),
				);
			}

			if (state.filterSortState?.sortBy !== filterSortState.sortBy) {
				filterSortDispatch({
					type: CHANGE_SORT,
					sortName: state.filterSortState.sortBy,
				});
			}

			if (state.filterSortState?.searchTerm !== "") {
				filterSortDispatch({
					type: CHANGE_SEARCH_TERM,
					searchTerm: state.filterSortState.searchTerm,
				});
			}
			await searchRepositories({
				searchTerm: state.filterSortState.searchTerm,
				filterBy: state.filterSortState.filterBy,
				sortByValue: state.filterSortState.sortBy,
				pageNum: state.pageNum,
			});
		}
	}, []);

	React.useEffect(() => {
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
			repoDispatch({ type: RESET });
		}
	}, [filterSortState.searchTerm]);

	React.useEffect(async () => {
		if (filterSortState.searchTerm !== "") {
			await searchRepositories();
		}
	}, [filterSortState.filterBy, filterSortState.sortBy, repoState.pageNum]);

	const searchRepositories = async (input?: IGetRepositoriesInput) => {
		const getReposInput: IGetRepositoriesInput = {
			searchTerm: input?.searchTerm || filterSortState.searchTerm,
			filterBy: input?.filterBy || filterSortState.filterBy,
			sortByValue: input?.sortByValue || sortValues[filterSortState.sortBy],
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
						addFilter={(filterToAdd: IFilterSortOption) =>
							filterSortDispatch({
								type: ADD_FILTER,
								filterName: filterToAdd.name,
								filterValues: filterToAdd.values,
							})
						}
						changeSearchTerm={(value: string) =>
							filterSortDispatch({ type: CHANGE_SEARCH_TERM, searchTerm: value })
						}
						changeSort={(sortName: string) =>
							filterSortDispatch({ type: CHANGE_SORT, sortName })
						}
						filterBy={filterSortState.filterBy}
						searchRepositories={() => searchRepositories()}
						searchTerm={filterSortState.searchTerm}
						sortBy={filterSortState.sortBy}
					/>
				</div>
				<RepoList
					changePage={(pageNum: number) => repoDispatch({ type: CHANGE_PAGE, pageNum })}
					filterSortState={filterSortState}
					pageNum={repoState.pageNum}
					repos={repoState.repos}
					totalPages={repoState.totalPages}
				/>
				{showScrollToTopBtn && (
					<ScrollToTopButton onClick={() => window.scrollTo(0, 0)}>
						<FontAwesomeIcon icon={faArrowUp} /> Back to Top
					</ScrollToTopButton>
				)}
			</AppWrapper>
		</SearchRepositoriesContainer>
	);
};
