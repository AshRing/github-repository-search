import * as React from "react";

import { RepoListContainer, StatusText } from "./RepoList.styles";

import { IRepository } from "../../../_types";
import { Link } from "react-router-dom";
import { Pagination } from "./Pagination";
import { Repo } from "./Repo";

interface Props {
	changePage: (pageNum: number) => void;
	pageNum: number;
	repos: IRepository[];
	reposLoading: boolean;
	totalPages: number;
}

export const RepoList = ({ changePage, pageNum, repos, reposLoading, totalPages }: Props) => {
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
						<Link to={`/${repo.owner.login}/${repo.name}`} key={repo.id}>
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
