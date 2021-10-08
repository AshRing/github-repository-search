import * as React from "react";

import { FilterSort, filters, sortInputs } from ".";
import { FilterSortContainer, SearchInput } from "./FilterSort.styles";
import { mount, shallow } from "enzyme";

import { IFilterSortOption } from "../../../_types";
import { SelectInput } from "./SelectInput";
import { TestWrapper } from "../../../_mocks";

let props;
beforeEach(() => {
	props = {
		addFilter: jest.fn(),
		changeSearchTerm: jest.fn(),
		changeSort: jest.fn(),
		filterBy: [],
		searchRepositories: jest.fn(),
		searchTerm: "",
		sortBy: sortInputs.bestMatch,
	};
});

test("FilterSort matches snapshot", () => {
	const wrapper = shallow(<FilterSort {...props} />);
	expect(wrapper).toMatchSnapshot();
});

test("changes search term on search input change", () => {
	const searchTerm = "test";
	const wrapper = mount(
		<TestWrapper>
			<FilterSort {...props} />
		</TestWrapper>,
	);
	wrapper.find(SearchInput).simulate("change", { target: { value: searchTerm } });
	expect(props.changeSearchTerm).toHaveBeenCalledWith(searchTerm);
});

test("doesn't display reset search button if term is empty", () => {
	props = {
		...props,
		searchTerm: "",
	};
	const wrapper = mount(
		<TestWrapper>
			<FilterSort {...props} />
		</TestWrapper>,
	);
	expect(wrapper.find("#resetSearchButton").exists()).toBeFalsy();
});

test("displays reset search button if term is populated & initiates reset", () => {
	props = {
		...props,
		searchTerm: "test",
	};
	const wrapper = mount(
		<TestWrapper>
			<FilterSort {...props} />
		</TestWrapper>,
	);
	expect(wrapper.find("#resetSearchButton").exists()).toBeTruthy();
	wrapper.find("#resetSearchButton").simulate("click");
	expect(props.changeSearchTerm).toHaveBeenCalledWith("");
});

test("language filter input handles filter change", () => {
	const selected = ["HTML"];
	const wrapper = mount(
		<TestWrapper>
			<FilterSort {...props} />
		</TestWrapper>,
	);
	wrapper.find("#languageFilterInput").find(SelectInput).prop("handleChange")(selected);
	expect(props.addFilter).toHaveBeenCalledWith({ name: filters.language, values: selected });
});

test("language filter selected prop is empty array if filter doesn't exist", () => {
	props = {
		...props,
		filterBy: [],
	};
	const wrapper = mount(
		<TestWrapper>
			<FilterSort {...props} />
		</TestWrapper>,
	);
	expect(wrapper.find("#languageFilterInput").find(SelectInput).prop("selected")).toEqual([]);
});

test("language filter selected prop contains language values if filter exists", () => {
	const languageFilter: IFilterSortOption = { name: filters.language, values: ["HTML"] };
	props = {
		...props,
		filterBy: [languageFilter],
	};
	const wrapper = mount(
		<TestWrapper>
			<FilterSort {...props} />
		</TestWrapper>,
	);
	expect(wrapper.find("#languageFilterInput").find(SelectInput).prop("selected")).toEqual(
		languageFilter.values,
	);
});

test("sort input handles change", () => {
	const selected = [sortInputs.stars];
	const wrapper = mount(
		<TestWrapper>
			<FilterSort {...props} />
		</TestWrapper>,
	);
	wrapper.find("#sortInput").find(SelectInput).prop("handleChange")(selected);
	expect(props.changeSort).toHaveBeenCalledWith(selected[0]);
});

test("submit searches repos", () => {
	const wrapper = mount(
		<TestWrapper>
			<FilterSort {...props} />
		</TestWrapper>,
	);
	wrapper.find(FilterSortContainer).simulate("submit");
	expect(props.searchRepositories).toHaveBeenCalled();
});
