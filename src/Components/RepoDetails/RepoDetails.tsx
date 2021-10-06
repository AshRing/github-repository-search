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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IRepository } from "../../_types";
import { Link } from "react-router-dom";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import { useLocation } from "react-router-dom";

export const RepoDetails = () => {
	const { state }: { state: IRepository } = useLocation();
	console.log(state);

	return (
		<RepoDetailsContainer>
			<Link to="/">
				<BackButton>
					<FontAwesomeIcon icon={faTimes} />
				</BackButton>
			</Link>
			<RepoDetailsInnerContainer>
				<RepoTitle>
					<AvatarContainer>
						<img src={state.owner.avatar_url} alt="owner avatar" />
					</AvatarContainer>
					<h1>{state.full_name}</h1>
				</RepoTitle>
				<RepoDetailsBody>
					<p>{state.description}</p>
					<RepoCountsContainer>
						<div>
							<h3>Forks:</h3> <span>{state.forks_count}</span>
						</div>
						<div>
							<h3>Stars:</h3> <span>{state.stargazers_count}</span>
						</div>
						<div>
							<h3>Watchers:</h3> <span>{state.watchers_count}</span>
						</div>
						<div>
							<h3>Open Issues:</h3> <span>{state.open_issues_count}</span>
						</div>
					</RepoCountsContainer>
					<RepoDatesContainer>
						<p>
							Created On{" "}
							<strong>{format(new Date(state.created_at), "MMM dd, yyyy")}</strong>
						</p>
						<p>
							Last Updated On{" "}
							<strong>{format(new Date(state.updated_at), "MMM dd, yyyy")}</strong>
						</p>
					</RepoDatesContainer>
				</RepoDetailsBody>
				<RepoDetailsLinks>
					{state.homepage !== "" && (
						<a href={state.homepage} target="_blank" id="visitHomepageLink">
							<div>
								<span>Visit Homepage</span>
							</div>
						</a>
					)}
					<a href={state.html_url} target="_blank" id="visitGithubLink">
						<div>
							<span>Visit on GitHub</span>
						</div>
					</a>
				</RepoDetailsLinks>
			</RepoDetailsInnerContainer>
		</RepoDetailsContainer>
	);
};
