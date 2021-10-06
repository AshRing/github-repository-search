import { AppWrapper } from "../App.styles";
import { darken } from "polished";
import { mediaQueries } from "../../_style";
import styled from "styled-components";

export const SearchRepositoriesContainer = styled.div`
	width: 100%;
	min-height: 100vh;
	height: 100%;
	position: relative;
	padding: 2rem 2rem 3rem;
	background: ${({ theme }) => theme.colors.tertiary};

	${AppWrapper} > h1 {
		margin-bottom: 2rem;

		${mediaQueries.desktop} {
			margin: 1rem 0 3rem;
		}
	}

	${mediaQueries.desktop} {
		padding-bottom: 2rem;
	}
`;

export const ScrollToTopButton = styled.button`
	color: #fff;
	background: ${({ theme }) => theme.colors.secondary};
	border-radius: 0;
	width: 100%;
	height: 3rem;
	position: fixed;
	bottom: 0;
	right: 0;

	${mediaQueries.desktop} {
		width: 3rem;
		bottom: 2rem;
		right: 2rem;
		border-radius: 50%;
	}

	svg {
		margin-right: 0.5rem;

		${mediaQueries.desktop} {
			margin-right: 0;
		}
	}

	span {
		${mediaQueries.desktop} {
			display: none;
		}
	}

	&:hover {
		background: ${({ theme }) => darken(0.1, theme.colors.secondary)};
	}
`;
