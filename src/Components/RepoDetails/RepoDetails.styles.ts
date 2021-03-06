import { lighten, rgba } from "polished";

import { mediaQueries } from "../../_style";
import styled from "styled-components";

export const RepoDetailsContainer = styled.div`
	width: 100%;
	height: 100vh;
	background: ${({ theme }) => theme.colors.tertiary};
	padding: 2rem;
	display: flex;
	align-items: center;
	position: relative;
`;

export const BackButton = styled.button`
	position: absolute;
	top: 1rem;
	right: 2rem;

	${mediaQueries.tabletLandscape} {
		right: 1rem;
		top: 1.5rem;
	}

	svg {
		color: ${({ theme }) => theme.colors.primary};
		font-size: 2rem;
	}
`;

export const RepoDetailsInnerContainer = styled.div`
	width: 100%;
	height: 90%;
	border-radius: 0.5rem;
	background: #fff;
	box-shadow: 2px 2px 2px ${({ theme }) => rgba(theme.colors.primary, 0.3)};
	overflow: hidden;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	max-width: 56.25rem;
	max-height: 40rem;
	margin: 0 auto;

	${mediaQueries.tabletLandscape} {
		position: relative;
	}
`;

export const RepoTitle = styled.div`
	display: flex;
	align-items: center;
	background: ${({ theme }) => theme.colors.secondary};
	padding: 1rem;

	& > h1 {
		word-break: break-word;
		flex: 1;
	}
`;

export const AvatarContainer = styled.div`
	width: 3rem;
	height: 3rem;
	border-radius: 50%;
	border: 1px solid ${({ theme }) => theme.colors.primary};
	margin-right: 0.5rem;
	overflow: hidden;
	background: #fff;

	img {
		width: 100%;
		height: auto;
	}
`;

export const RepoDetailsBody = styled.div`
	padding: 1rem;
	overflow-y: auto;
`;

export const RepoCountsContainer = styled.div`
	margin: 2rem 0;

	& > div {
		display: flex;
		align-items: center;

		&:not(:last-child) {
			margin-bottom: 0.5rem;
		}

		& > h3 {
			width: 50%;

			${mediaQueries.tabletPortrait} {
				width: 20%;
			}
		}
	}
`;

export const RepoDatesContainer = styled.div`
	margin-top: auto;

	& > p:not(:last-child) {
		margin-bottom: 0.5rem;
	}
`;

export const RepoDetailsLinks = styled.div`
	width: 100%;

	${mediaQueries.tabletPortrait} {
		display: flex;
	}

	& > a {
		${mediaQueries.tabletPortrait} {
			flex: 1;
		}
	}

	a > div {
		font-size: 1.25rem;
		text-align: center;
		font-weight: bold;
		height: 3rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	a#visitHomepageLink > div {
		background: ${({ theme }) => lighten(0.05, theme.colors.secondary)};
	}

	a#visitGithubLink > div {
		background: ${({ theme }) => theme.colors.secondary};
	}
`;
