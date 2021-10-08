import * as React from "react";

import {
	ClearButton,
	DrowdownArrow,
	SelectDropdown,
	SelectInputContainer,
	SelectLabel,
	SelectOption,
	SelectedText,
} from "./SelectInput.styles";
import {
	faArrowDown,
	faArrowLeft,
	faArrowRight,
	faArrowUp,
	faCheckSquare,
	faSquare,
	faTimes,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useOnClickOutside from "use-onclickoutside";

interface Props {
	handleChange: (selected: string[]) => void;
	label: string;
	multiselect?: boolean;
	options: string[];
	selected: string[];
}

export const SelectInput = ({ handleChange, label, multiselect, options, selected }: Props) => {
	const [dropdownOpen, toggleDropdown] = React.useState<boolean>(false);
	const containerRef: React.RefObject<HTMLDivElement> = React.useRef();
	const dropdownRef: React.RefObject<HTMLDivElement> = React.useRef();
	useOnClickOutside(
		dropdownRef,
		(e) => !containerRef.current.contains(e.target as Node) && toggleDropdown(false),
	);

	const handleMultiselectOptionSelection = (multiselectSelectedOption: string) => {
		if (selected.includes(multiselectSelectedOption)) {
			const optionRemoved: string[] = selected.filter(
				(selectedOption: string) => selectedOption !== multiselectSelectedOption,
			);
			handleChange(optionRemoved);
		} else {
			handleChange([...selected, multiselectSelectedOption]);
		}
	};

	const renderOptions = () => {
		return options.map((option: string, i: number) => {
			if (multiselect) {
				const optionSelected: boolean = selected.includes(option);

				return (
					<SelectOption
						key={`${option}-${i}`}
						selected={optionSelected}
						onClick={() => handleMultiselectOptionSelection(option)}
					>
						{optionSelected ? (
							<FontAwesomeIcon
								className="multiSelectOptionSelected"
								icon={faCheckSquare}
							/>
						) : (
							<FontAwesomeIcon
								className="multiSelectOptionNotSelected"
								icon={faSquare}
							/>
						)}
						<span>{option}</span>
					</SelectOption>
				);
			} else {
				const optionSelected: boolean = selected.includes(option);
				return (
					<SelectOption
						key={`${option}-${i}`}
						selected={optionSelected}
						onClick={() => {
							handleChange([option]);
							toggleDropdown(false);
						}}
					>
						<span>{option}</span>
					</SelectOption>
				);
			}
		});
	};

	return (
		<SelectInputContainer
			ref={containerRef}
			inputActive={selected.length || dropdownOpen}
			onClick={(e) =>
				!dropdownRef.current.contains(e.target) ? toggleDropdown(!dropdownOpen) : undefined
			}
		>
			<SelectLabel shrinkLabel={selected.length}>{label}</SelectLabel>
			<SelectedText>{selected.join(", ")}</SelectedText>
			<DrowdownArrow>
				{dropdownOpen ? (
					<>
						<FontAwesomeIcon
							icon={faArrowUp}
							className="dropdownOpenIcon largeScreen"
						/>
						<FontAwesomeIcon
							icon={faArrowRight}
							className="dropdownOpenIcon smallScreen"
						/>
					</>
				) : (
					<>
						<FontAwesomeIcon
							icon={faArrowDown}
							className="dropdownClosedIcon largeScreen"
						/>
						<FontAwesomeIcon
							icon={faArrowLeft}
							className="dropdownClosedIcon smallScreen"
						/>
					</>
				)}
			</DrowdownArrow>
			<SelectDropdown open={dropdownOpen} ref={dropdownRef}>
				<button id="dropdownCloseIcon" type="button" onClick={() => toggleDropdown(false)}>
					<FontAwesomeIcon icon={faTimes} />
				</button>
				<h1>{label}</h1>
				{renderOptions()}
				{selected.length > 0 && multiselect && (
					<ClearButton type="button" onClick={() => handleChange([])}>
						Clear
					</ClearButton>
				)}
			</SelectDropdown>
		</SelectInputContainer>
	);
};
