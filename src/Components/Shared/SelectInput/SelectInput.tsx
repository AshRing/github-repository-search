import * as React from "react";

import {
	DrowdownArrow,
	SelectDropdown,
	SelectInputContainer,
	SelectLabel,
	SelectOption,
	SelectedText,
} from "./SelectInput.styles";
import { faArrowDown, faArrowUp, faCheckSquare, faSquare } from "@fortawesome/free-solid-svg-icons";

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
	const [multiselectSelectedOptions, setMultiselectSelectedOptions] =
		React.useState<string[]>(selected);
	const dropdownRef: React.RefObject<HTMLDivElement> = React.useRef();
	useOnClickOutside(dropdownRef, () => handleClickOutside());

	React.useEffect(() => {
		if (multiselect) {
			setMultiselectSelectedOptions(selected);
		}
	}, [selected]);

	const handleClickOutside = () => {
		if (multiselect) {
			if (JSON.stringify(multiselectSelectedOptions) !== JSON.stringify(selected)) {
				setMultiselectSelectedOptions(selected);
			}
		}
		toggleDropdown(false);
	};

	const handleMultiselectOptionSelection = (multiselectSelectedOption: string) => {
		if (multiselectSelectedOptions.includes(multiselectSelectedOption)) {
			const optionRemoved: string[] = multiselectSelectedOptions.filter(
				(selectedOption: string) => selectedOption !== multiselectSelectedOption,
			);
			setMultiselectSelectedOptions(optionRemoved);
		} else {
			setMultiselectSelectedOptions([
				...multiselectSelectedOptions,
				multiselectSelectedOption,
			]);
		}
	};

	const renderOptions = () => {
		return options.map((option: string, i: number) => {
			if (multiselect) {
				const optionSelected: boolean = multiselectSelectedOptions.includes(option);

				return (
					<SelectOption
						key={`${option}-${i}`}
						selected={optionSelected}
						onClick={() => handleMultiselectOptionSelection(option)}
					>
						{optionSelected ? (
							<FontAwesomeIcon icon={faCheckSquare} />
						) : (
							<FontAwesomeIcon icon={faSquare} />
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
			inputActive={selected.length || dropdownOpen}
			onClick={() => (!dropdownOpen ? toggleDropdown(true) : undefined)}
		>
			<SelectLabel shrinkLabel={selected.length}>{label}</SelectLabel>
			<SelectedText>{selected.join(", ")}</SelectedText>
			<DrowdownArrow>
				{dropdownOpen ? (
					<FontAwesomeIcon icon={faArrowUp} />
				) : (
					<FontAwesomeIcon icon={faArrowDown} />
				)}
			</DrowdownArrow>
			<SelectDropdown open={dropdownOpen} ref={dropdownRef}>
				<h1>{label}</h1>
				{renderOptions()}
			</SelectDropdown>
		</SelectInputContainer>
	);
};
