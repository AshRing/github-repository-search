import * as React from "react";

import {
	ClearButton,
	DropdownArrow,
	SelectDropdown,
	SelectInputContainer,
	SelectOption,
} from "./SelectInput.styles";
import { TestWrapper, createDocumentListenersMock } from "../../../../_mocks";
import { mount, shallow } from "enzyme";

import { SelectInput } from ".";

let props;

describe("single select", () => {
	beforeEach(() => {
		props = {
			handleChange: jest.fn(),
			label: "Color",
			options: ["Red", "Green", "Blue"],
			selected: [],
			multiselect: false,
		};
	});

	test("Single select SelectInput matches snapshot", () => {
		const wrapper = shallow(<SelectInput {...props} />);
		expect(wrapper).toMatchSnapshot();
	});

	test("clicking the input container opens the select dropdown & has correct dropdown buttons", () => {
		const wrapper = mount(
			<TestWrapper>
				<SelectInput {...props} />
			</TestWrapper>,
		);
		expect(wrapper.find(SelectDropdown).prop("open")).toBeFalsy();
		expect(wrapper.find(DropdownArrow).prop("dropdownOpen")).toBeFalsy();
		wrapper.find(SelectInputContainer).simulate("click");
		wrapper.update();
		expect(wrapper.find(SelectDropdown).prop("open")).toBeTruthy();
		expect(wrapper.find(DropdownArrow).prop("dropdownOpen")).toBeTruthy();
	});

	test("close icon closes select dropdown", () => {
		const wrapper = mount(
			<TestWrapper>
				<SelectInput {...props} />
			</TestWrapper>,
		);
		wrapper.find(SelectInputContainer).simulate("click");
		wrapper.update();
		expect(wrapper.find(SelectDropdown).prop("open")).toBeTruthy();
		wrapper.find("#dropdownCloseIcon").simulate("click");
		wrapper.update();
		expect(wrapper.find(SelectDropdown).prop("open")).toBeFalsy();
	});

	test("single select doesn't display clear button", () => {
		const wrapper = mount(
			<TestWrapper>
				<SelectInput {...props} />
			</TestWrapper>,
		);
		expect(wrapper.find(ClearButton).exists()).toBeFalsy();
	});

	test("clicking an option selects that option and closes dropdown", () => {
		const wrapper = mount(
			<TestWrapper>
				<SelectInput {...props} />
			</TestWrapper>,
		);
		wrapper.find(SelectInputContainer).simulate("click");
		wrapper.update();
		expect(wrapper.find(SelectDropdown).prop("open")).toBeTruthy();
		const firstOption = wrapper.find(SelectOption).first();
		const optionText = firstOption.find("span").text();
		firstOption.simulate("click");
		wrapper.update();
		expect(props.handleChange).toHaveBeenCalledWith([optionText]);
		expect(wrapper.find(SelectDropdown).prop("open")).toBeFalsy();
	});

	test("click outside closes select dropdown", () => {
		const fireEvent = createDocumentListenersMock();
		const wrapper = mount(
			<TestWrapper>
				<SelectInput {...props} />
			</TestWrapper>,
		);
		wrapper.find(SelectInputContainer).simulate("click");
		wrapper.update();
		expect(wrapper.find(SelectDropdown).prop("open")).toBeTruthy();
		fireEvent.mouseDown(document.body);
		wrapper.update();
		expect(wrapper.find(SelectDropdown).prop("open")).toBeFalsy();
	});
});

describe("multiselect", () => {
	beforeEach(() => {
		props = {
			handleChange: jest.fn(),
			label: "Color",
			options: ["Red", "Green", "Blue"],
			selected: ["Red"],
			multiselect: true,
		};
	});

	test("multiselect SelectInput matches snapshot", () => {
		const wrapper = shallow(<SelectInput {...props} />);
		expect(wrapper).toMatchSnapshot();
	});

	test("multiselect doesn't displays clear button if nothing is selected", () => {
		props = {
			...props,
			selected: [],
		};
		const wrapper = mount(
			<TestWrapper>
				<SelectInput {...props} />
			</TestWrapper>,
		);
		expect(wrapper.find(ClearButton).exists()).toBeFalsy();
	});

	test("multiselect displays clear button if options are selected & clicking it clears selected options", () => {
		props = {
			...props,
			selected: ["Red"],
		};
		const wrapper = mount(
			<TestWrapper>
				<SelectInput {...props} />
			</TestWrapper>,
		);
		expect(wrapper.find(ClearButton).exists()).toBeTruthy();
		wrapper.find(ClearButton).simulate("click");
		expect(props.handleChange).toHaveBeenCalledWith([]);
	});

	test("clicking a multiselect option selects it if it hasn't been selected", () => {
		const selectColor = "Green";
		props = {
			...props,
			selected: ["Red"],
		};
		const wrapper = mount(
			<TestWrapper>
				<SelectInput {...props} />
			</TestWrapper>,
		);
		wrapper.find(SelectInputContainer).simulate("click");
		wrapper.update();
		expect(wrapper.find(SelectDropdown).prop("open")).toBeTruthy();
		wrapper
			.find(SelectOption)
			.findWhere((w) => w.text().includes(selectColor))
			.first()
			.simulate("click");
		expect(props.handleChange).toHaveBeenCalledWith([...props.selected, selectColor]);
	});

	test("clicking a multiselect option deselects option if it had been selected", () => {
		const selectColor = "Green";
		props = {
			...props,
			selected: [selectColor],
		};
		const wrapper = mount(
			<TestWrapper>
				<SelectInput {...props} />
			</TestWrapper>,
		);
		wrapper.find(SelectInputContainer).simulate("click");
		wrapper.update();
		expect(wrapper.find(SelectDropdown).prop("open")).toBeTruthy();
		wrapper
			.find(SelectOption)
			.findWhere((w) => w.text().includes(selectColor))
			.first()
			.simulate("click");
		const optionRemoved: string[] = props.selected.filter(
			(selectedOption: string) => selectedOption !== selectColor,
		);
		expect(props.handleChange).toHaveBeenCalledWith(optionRemoved);
	});
});
