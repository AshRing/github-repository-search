import * as React from "react";

import {
	RepoContainer,
	RepoDescription,
	RepoFlexContainer,
	RepoLanguage,
	RepoName,
	RepoStars,
} from "./Repo.styles";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IRepository } from "../../../../_types";
import { faStar } from "@fortawesome/free-solid-svg-icons";

interface Props {
	repoInfo: IRepository;
}

export const Repo = ({ repoInfo }: Props) => {
	return (
		<RepoContainer>
			<RepoFlexContainer>
				<RepoName>{repoInfo.full_name}</RepoName>
			</RepoFlexContainer>
			<RepoDescription>{repoInfo.description}</RepoDescription>
			<RepoFlexContainer>
				<RepoLanguage>{repoInfo.language}</RepoLanguage>
				<RepoStars>
					<span>{repoInfo.stargazers_count}</span>
					<FontAwesomeIcon icon={faStar} />
				</RepoStars>
			</RepoFlexContainer>
		</RepoContainer>
	);
};
