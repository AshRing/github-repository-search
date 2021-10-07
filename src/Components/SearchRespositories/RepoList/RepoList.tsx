import * as React from "react";

import { IFilterSortReducerState, IRepository } from "../../../_types";
import { RepoListContainer, StatusText } from "./RepoList.styles";

import { Link } from "react-router-dom";
import { Pagination } from "../../../Components/Shared";
import { Repo } from "./Repo";

interface Props {
	changePage: (pageNum: number) => void;
	filterSortState: IFilterSortReducerState;
	pageNum: number;
	repos: IRepository[];
	reposLoading: boolean;
	totalPages: number;
}

export const RepoList = ({
	changePage,
	filterSortState,
	pageNum,
	repos,
	reposLoading,
	totalPages,
}: Props) => {
	const renderStatusText = () => {
		if (reposLoading) {
			return <StatusText>Loading...</StatusText>;
		}

		if (!repos) {
			return <StatusText>Please enter a search term</StatusText>;
		}
	};

	return (
		<RepoListContainer>
			{renderStatusText()}
			{!reposLoading && (
				<>
					{repos?.map((repo: IRepository) => (
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
						<Pagination
							changePage={changePage}
							currentPage={pageNum}
							totalPages={totalPages}
						/>
					)}
				</>
			)}
		</RepoListContainer>
	);
};
