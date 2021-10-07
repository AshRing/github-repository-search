import * as React from "react";

import { IFilterSortReducerState, IRepository } from "../../../_types";

import { Link } from "react-router-dom";
import { Pagination } from "../../../Components/Shared";
import { Repo } from "./Repo";
import { RepoListContainer } from "./RepoList.styles";

interface Props {
	changePage: (pageNum: number) => void;
	filterSortState: IFilterSortReducerState;
	pageNum: number;
	repos: IRepository[];
	totalPages: number;
}

export const RepoList = ({ changePage, filterSortState, pageNum, repos, totalPages }: Props) => {
	return (
		<RepoListContainer>
			{repos &&
				repos.map((repo: IRepository) => (
					<Link
						to={{
							pathname: `/${repo.name}`,
							state: { repo, filterSortState, pageNum },
						}}
						key={repo.id}
					>
						<Repo repoInfo={repo} />
					</Link>
				))}
			{repos?.length > 0 && (
				<Pagination changePage={changePage} currentPage={pageNum} totalPages={totalPages} />
			)}
		</RepoListContainer>
	);
};
