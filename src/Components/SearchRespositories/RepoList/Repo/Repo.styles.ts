import { mediaQueries } from "../../../../_style";
import { rgba } from "polished";
import styled from "styled-components";

export const RepoContainer = styled.div`
	padding: 0.5rem 1rem;
	width: 100%;
	background: #fff;
	box-shadow: 2px 2px 2px ${({ theme }) => rgba(theme.colors.primary, 0.3)};
	border-radius: 0.25rem;
	margin-bottom: 1rem;
	overflow: hidden;

	${mediaQueries.desktop} {
		padding: 1rem 1.5rem;
		margin-bottom: 1.5rem;
	}
`;

export const RepoFlexContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const RepoName = styled.h2`
	color: ${({ theme }) => theme.colors.primary};
	word-break: break-word;
`;

export const RepoLanguage = styled.span`
	font-style: italic;
`;

export const RepoDescription = styled.p`
	font-size: 0.75rem;
	margin: 0.5rem 0;
`;

export const RepoStars = styled.div`
	display: flex;
	align-items: center;

	svg {
		margin-left: 0.25rem;
		color: ${({ theme }) => theme.colors.primary};
	}
`;
