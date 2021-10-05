import * as React from "react";

import { IRepository } from "../../../_types";
import { Link } from "react-router-dom";
import { Pagination } from "../../../Components/Shared";
import { Repo } from "./Repo";
import { RepoListContainer } from "./RepoList.styles";

interface Props {
	changePage: (pageNum: number) => void;
	pageNum: number;
	repos: IRepository[];
	totalPages: number;
}

export const RepoList = ({ changePage, pageNum, repos, totalPages }: Props) => {
	return (
		<RepoListContainer>
			{repos.map((repo: IRepository) => (
				<Link to={`/${repo.name}`} key={repo.id}>
					<Repo repoInfo={repo} />
				</Link>
			))}
			{repos.length > 0 && (
				<Pagination changePage={changePage} currentPage={pageNum} totalPages={totalPages} />
			)}
		</RepoListContainer>
	);
};
