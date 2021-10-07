import * as React from "react";

import {
	AvatarContainer,
	BackButton,
	RepoCountsContainer,
	RepoDatesContainer,
	RepoDetailsBody,
	RepoDetailsContainer,
	RepoDetailsInnerContainer,
	RepoDetailsLinks,
	RepoTitle,
} from "./RepoDetails.styles";
import { useHistory, useLocation } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ILocationState } from "../../_types";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";

export const RepoDetails = () => {
	const { state }: { state: ILocationState } = useLocation();
	const { repo } = state;
	const history = useHistory();

	return (
		<RepoDetailsContainer>
			<RepoDetailsInnerContainer>
				<BackButton onClick={() => history.goBack()}>
					<FontAwesomeIcon icon={faTimes} />
				</BackButton>
				<div>
					<RepoTitle>
						<AvatarContainer>
							<img src={repo.owner.avatar_url} alt="owner avatar" />
						</AvatarContainer>
						<h1>{repo.full_name}</h1>
					</RepoTitle>
					<RepoDetailsBody>
						<p>{repo.description}</p>
						<RepoCountsContainer>
							<div>
								<h3>Forks:</h3> <span>{repo.forks_count}</span>
							</div>
							<div>
								<h3>Stars:</h3> <span>{repo.stargazers_count}</span>
							</div>
							<div>
								<h3>Watchers:</h3> <span>{repo.watchers_count}</span>
							</div>
							<div>
								<h3>Open Issues:</h3> <span>{repo.open_issues_count}</span>
							</div>
						</RepoCountsContainer>
						<RepoDatesContainer>
							<p>
								Created On{" "}
								<strong>{format(new Date(repo.created_at), "MMM dd, yyyy")}</strong>
							</p>
							<p>
								Last Updated On{" "}
								<strong>{format(new Date(repo.updated_at), "MMM dd, yyyy")}</strong>
							</p>
						</RepoDatesContainer>
					</RepoDetailsBody>
				</div>
				<RepoDetailsLinks>
					{repo.homepage !== "" && (
						<a href={repo.homepage} target="_blank" id="visitHomepageLink">
							<div>
								<span>Visit Homepage</span>
							</div>
						</a>
					)}
					<a href={repo.html_url} target="_blank" id="visitGithubLink">
						<div>
							<span>Visit on GitHub</span>
						</div>
					</a>
				</RepoDetailsLinks>
			</RepoDetailsInnerContainer>
		</RepoDetailsContainer>
	);
};
