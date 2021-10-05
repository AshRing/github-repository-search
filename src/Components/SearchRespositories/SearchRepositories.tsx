import * as React from "react";

import {
	ADD_FILTER,
	CHANGE_SEARCH_TERM,
	CHANGE_SORT,
	GET_REPOS_SUCCESS,
	filterSortInitialState,
	filterSortReducer,
	repoReducer,
	repoReducerInitialState,
} from "./reducer";
import { FilterSort, filters, sortValues } from "./FilterSort";
import { IFilterSortOption, IGetRepositoriesInput } from "../../_types";
import { ScrollToTopButton, SearchRepositoriesContainer } from "./SearchRepositories.styles";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RepoList } from "./RepoList";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { getRepositories } from "../../_api";

export const SearchRepositories = () => {
	const [filterSortState, filterSortDispatch] = React.useReducer(
		filterSortReducer,
		filterSortInitialState,
	);
	const [repoState, repoDispatch] = React.useReducer(repoReducer, repoReducerInitialState);
	const [showScrollToTopBtn, toggleScrollToTopBtn] = React.useState<boolean>(false);
	const filterSortRef: React.RefObject<HTMLDivElement> = React.useRef();

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

	React.useEffect(async () => {
		if (filterSortState.searchTerm !== "") {
			await searchRepositories();
		}
	}, [filterSortState.filterBy, filterSortState.sortBy]);

	const searchRepositories = async () => {
		const getReposInput: IGetRepositoriesInput = {
			searchTerm: filterSortState.searchTerm,
			filterBy: filterSortState.filterBy,
			sortByValue: sortValues[filterSortState.sortBy],
		};
		await getRepositories(getReposInput).then((res) => {
			repoDispatch({ type: GET_REPOS_SUCCESS, repos: res.items });
		});
	};

	return (
		<SearchRepositoriesContainer>
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
				repos={repoState.repos}
				pageNum={repoState.pageNum}
				changePage={(direction: number) => console.log(direction)}
			/>
			{showScrollToTopBtn && (
				<ScrollToTopButton onClick={() => window.scrollTo(0, 0)}>
					<FontAwesomeIcon icon={faArrowUp} />
				</ScrollToTopButton>
			)}
		</SearchRepositoriesContainer>
	);
};
