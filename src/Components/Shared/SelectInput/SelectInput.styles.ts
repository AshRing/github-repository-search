import styled from "styled-components";

export const SelectInputContainer = styled.div<{ inputActive: boolean }>`
	position: relative;
	height: 2.5rem;
	border-radius: 0.25rem;
	padding: 0 2rem 0 1rem;
	transition: 0.2s ease border;
	display: flex;
	align-items: center;
	cursor: pointer;
	border: 1px solid
		${({ inputActive, theme }) =>
			!inputActive ? theme.colors.secondary : theme.colors.primary};
`;

export const SelectLabel = styled.span<{ shrinkLabel: boolean }>`
	position: absolute;
	top: ${({ shrinkLabel }) => (shrinkLabel ? "0" : "50%")};
	left: ${({ shrinkLabel }) => (shrinkLabel ? ".5rem" : "1rem")};
	font-size: ${({ shrinkLabel }) => (shrinkLabel ? ".75rem" : "1rem")};
	transform: translateY(-50%);
	transition: 0.2s ease all;
	padding: ${({ shrinkLabel }) => shrinkLabel && ".2rem"};
	color: ${({ theme }) => theme.colors.primary};
	background-color: #fff;
`;

export const SelectedText = styled.span`
	width: 100%;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
`;

export const DrowdownArrow = styled.div`
	position: absolute;
	top: 50%;
	right: 0.5rem;
	transform: translateY(-50%);
	& > svg {
		color: ${({ theme }) => theme.colors.secondary};
	}
`;

export const SelectDropdown = styled.div<{ open: boolean }>`
	position: fixed;
	top: 0;
	bottom: 0;
	right: ${({ open }) => (open ? "0" : "-100%")};
	width: 75%;
	background: ${({ theme }) => theme.colors.secondary};
	padding: 2rem;
	transition: 0.3s ease-out all;
	z-index: 5;

	& > h1 {
		font-size: 1.5rem;
		margin-bottom: 2.5rem;
	}
`;

export const SelectOption = styled.div<{ selected: boolean }>`
	display: flex;

	&:not(:last-child) {
		margin-bottom: 1rem;
	}

	& > svg {
		margin-right: 0.5rem;
		color: ${({ theme }) => theme.colors.primary};
	}

	& > span {
		font-weight: ${({ selected }) => selected && "bold"};
	}
`;
