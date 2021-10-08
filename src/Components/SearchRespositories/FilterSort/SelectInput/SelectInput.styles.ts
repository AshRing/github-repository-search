import { mediaQueries } from "../../../../_style";
import { rgba } from "polished";
import styled from "styled-components";

const inputHeight = "2.5rem";

export const SelectInputContainer = styled.div<{ inputActive: boolean }>`
	position: relative;
	height: ${inputHeight};
	border-radius: 0.25rem;
	padding: 0 2rem 0 1rem;
	transition: 0.2s ease border;
	display: flex;
	align-items: center;
	cursor: pointer;
	background: #fff;
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
	background: ${({ shrinkLabel, theme }) =>
		shrinkLabel
			? `linear-gradient(to bottom, ${theme.colors.tertiary} 50%, #fff 50%)`
			: "#fff"};
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

	.largeScreen {
		display: none;

		${mediaQueries.desktop} {
			display: initial;
		}
	}

	.smallScreen {
		${mediaQueries.desktop} {
			display: none;
		}
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

	${mediaQueries.tabletPortrait} {
		width: 50%;
	}

	${mediaQueries.desktop} {
		position: absolute;
		bottom: auto;
		left: 0;
		width: 100%;
		top: calc(${inputHeight} + 0.25rem);
		opacity: ${({ open }) => (open ? "1" : "0")};
		transform-origin: top;
		transform: scaleY(${({ open }) => (open ? "1" : "0")});
		border-radius: 0.25rem;
		background: #fff;
		border: 1px solid ${({ theme }) => theme.colors.secondary};
		box-shadow: 2px 2px 2px ${({ theme }) => rgba(theme.colors.primary, 0.3)};
		padding: 1rem 1.5rem;
	}

	& > h1 {
		font-size: 1.5rem;
		margin-bottom: 2.5rem;

		${mediaQueries.desktop} {
			display: none;
		}
	}

	& .fa-times {
		position: absolute;
		top: 2rem;
		right: 2rem;
		color: ${({ theme }) => theme.colors.primary};
		font-size: 2rem;

		${mediaQueries.desktop} {
			display: none;
		}
	}
`;

export const SelectOption = styled.div<{ selected: boolean }>`
	display: flex;

	&:not(:last-child) {
		margin-bottom: 0.5rem;
	}

	& > svg {
		margin-right: 0.5rem;
		color: ${({ theme }) => theme.colors.primary};
	}

	& > span {
		font-weight: ${({ selected }) => selected && "bold"};
	}
`;

export const ClearButton = styled.button`
	font-size: 1rem;
	font-weight: bold;
	margin: 1rem 0 0;
`;
