import * as React from "react";

import { IRepository } from "src/_types";
import { Link } from "react-router-dom";
import { Repo } from "./Repo";
import { RepoListContainer } from "./RepoList.styles";

interface Props {
	changePage: (direction: number) => void;
	pageNum: number;
	repos: IRepository[];
}

export const RepoList = ({ changePage, pageNum, repos }: Props) => {
	return (
		<RepoListContainer>
			{repos.map((repo: IRepository) => (
				<Link to={`/${repo.name}`} key={repo.id}>
					<Repo repoInfo={repo} />
				</Link>
			))}
		</RepoListContainer>
	);
};
