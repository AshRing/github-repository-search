import styled from "styled-components";

export const PaginationContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 1rem 0;
`;

export const ArrowContainer = styled.div`
	width: 3.5rem;
	display: flex;

	button {
		margin: 0.25rem;
		background: none;
	}

	svg {
		color: ${({ theme }) => theme.colors.primary};
		font-size: 2rem;
	}
`;
