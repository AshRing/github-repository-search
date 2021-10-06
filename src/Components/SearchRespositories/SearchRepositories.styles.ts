import { AppWrapper } from "../App.styles";
import { darken } from "polished";
import styled from "styled-components";

export const SearchRepositoriesContainer = styled.div`
	width: 100%;
	min-height: 100vh;
	height: 100%;
	position: relative;
	padding: 2rem 2rem 3rem;
	background: ${({ theme }) => theme.colors.tertiary};

	${AppWrapper} > h1 {
		font-size: 1.5rem;
		margin-bottom: 2rem;
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

	svg {
		margin-right: 0.5rem;
	}

	&:hover {
		background: ${({ theme }) => darken(0.1, theme.colors.secondary)};
	}
`;
