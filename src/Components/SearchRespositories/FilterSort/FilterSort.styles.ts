import styled from "styled-components";

export const SearchInputContainer = styled.div`
	position: relative;
	width: 100%;
	margin-bottom: 1rem;

	& > .fa-search {
		position: absolute;
		top: 50%;
		left: 1rem;
		transform: translate(-50%, -50%);
		color: ${({ theme }) => theme.colors.secondary};
	}
`;

export const SearchInput = styled.input`
	width: 100%;
	padding: 0 1rem 0 2rem;
	height: 2.5rem;
	border-radius: 0.25rem;
	border: 1px solid ${({ theme }) => theme.colors.secondary};
	outline: none;
	transition: 0.2s ease border-color;

	&:focus {
		border-color: ${({ theme }) => theme.colors.primary};
	}
`;

export const FilterSortContainer = styled.div`
	display: flex;
	column-gap: 1rem;

	& > div {
		width: 50%;
	}
`;
