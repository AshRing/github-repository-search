import { mediaQueries } from "../../../_style";
import styled from "styled-components";

export const RepoListContainer = styled.div`
	padding-top: 1rem;
	border-top: 1px solid ${({ theme }) => theme.colors.primary};

	${mediaQueries.desktop} {
		padding-top: 3rem;
	}
`;

export const StatusText = styled.span`
	font-size: 1.25rem;
	font-style: italic;
`;
