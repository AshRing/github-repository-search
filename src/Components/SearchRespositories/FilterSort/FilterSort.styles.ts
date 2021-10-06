import styled from "styled-components";

export const FilterSortContainer = styled.form`
	margin-bottom: 2rem;
`;

export const SearchInputContainer = styled.div`
	position: relative;
	width: 100%;
	margin-bottom: 1rem;

	& > .fa-search,
	& .fa-times {
		position: absolute;
		top: 50%;
		transform: translate(-50%, -50%);
		color: ${({ theme }) => theme.colors.secondary};
	}

	& > .fa-search {
		left: 1rem;
	}

	& .fa-times {
		right: 0.5rem;
	}
`;

export const SearchInput = styled.input`
	width: 100%;
	padding: 0 2rem 0;
	height: 2.5rem;
	border-radius: 0.25rem;
	border: 1px solid ${({ theme }) => theme.colors.secondary};
	outline: none;
	transition: 0.2s ease border-color;

	&:focus {
		border-color: ${({ theme }) => theme.colors.primary};
	}
`;

export const FilterSortGroup = styled.div`
	display: flex;
	flex-direction: column;
	row-gap: 1rem;

	& > div {
		width: 100%;
	}
`;
