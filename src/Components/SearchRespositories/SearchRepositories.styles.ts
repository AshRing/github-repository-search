import { darken } from "polished";
import styled from "styled-components";

export const SearchRepositoriesContainer = styled.div`
	width: 100%;
	height: 100%;
	position: relative;

	& > h1 {
		font-size: 1.5rem;
		margin-bottom: 2rem;
		text-align: center;
	}
`;

export const ScrollToTopButton = styled.button`
	border-radius: 50%;
	width: 3rem;
	height: 3rem;
	color: #fff;
	background: ${({ theme }) => theme.colors.secondary};
	position: fixed;
	bottom: 1rem;
	right: 1rem;

	&:hover {
		background: ${({ theme }) => darken(0.1, theme.colors.secondary)};
	}
`;
