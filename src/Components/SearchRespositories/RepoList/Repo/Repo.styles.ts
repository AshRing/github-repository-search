import styled from "styled-components";

export const RepoContainer = styled.div`
	padding: 0.5rem 1rem;
	width: 100%;
	border: 1px solid ${({ theme }) => theme.colors.secondary};
	margin-bottom: 1rem;
`;

export const RepoFlexContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const RepoName = styled.h2`
	color: ${({ theme }) => theme.colors.primary};
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
