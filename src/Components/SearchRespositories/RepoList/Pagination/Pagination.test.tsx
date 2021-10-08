import * as React from "react";

import { mount, shallow } from "enzyme";

import { Pagination } from ".";
import { TestWrapper } from "../../../../_mocks";

let props;
beforeEach(() => {
	props = {
		changePage: jest.fn(),
		currentPage: 1,
		totalPages: 3,
	};
});

test("Pagination matches snapshot", () => {
	const wrapper = shallow(<Pagination {...props} />);
	expect(wrapper).toMatchSnapshot();
});

test("Don't show left arrows on the first page", () => {
	props = {
		...props,
		currentPage: 1,
	};
	const wrapper = mount(
		<TestWrapper>
			<Pagination {...props} />
		</TestWrapper>,
	);
	expect(wrapper.find("#pageDoubleLeftArrow").exists()).toBeFalsy();
	expect(wrapper.find("#pageLeftArrow").exists()).toBeFalsy();
});

test("show left arrows if there are multiple pages and current page is greater than 1", () => {
	props = {
		...props,
		currentPage: 2,
		totalPages: 3,
	};
	const wrapper = mount(
		<TestWrapper>
			<Pagination {...props} />
		</TestWrapper>,
	);
	expect(wrapper.find("#pageDoubleLeftArrow").exists()).toBeTruthy();
	expect(wrapper.find("#pageLeftArrow").exists()).toBeTruthy();
});

test("double left arrow changes page to the first page", () => {
	props = {
		...props,
		currentPage: 3,
		totalPages: 3,
	};
	const wrapper = mount(
		<TestWrapper>
			<Pagination {...props} />
		</TestWrapper>,
	);
	wrapper.find("#pageDoubleLeftArrow").simulate("click");
	expect(props.changePage).toHaveBeenCalledWith(1);
});

test("single left arrow changes page to the previous page", () => {
	props = {
		...props,
		currentPage: 3,
		totalPages: 3,
	};
	const wrapper = mount(
		<TestWrapper>
			<Pagination {...props} />
		</TestWrapper>,
	);
	wrapper.find("#pageLeftArrow").simulate("click");
	expect(props.changePage).toHaveBeenCalledWith(props.currentPage - 1);
});

test("Don't show right arrows on the last page", () => {
	props = {
		...props,
		currentPage: props.totalPages,
	};
	const wrapper = mount(
		<TestWrapper>
			<Pagination {...props} />
		</TestWrapper>,
	);
	expect(wrapper.find("#pageDoubleRightArrow").exists()).toBeFalsy();
	expect(wrapper.find("#pageRightArrow").exists()).toBeFalsy();
});

test("show right arrows if there are multiple pages and current page is less than total pages", () => {
	props = {
		...props,
		currentPage: 2,
		totalPages: 3,
	};
	const wrapper = mount(
		<TestWrapper>
			<Pagination {...props} />
		</TestWrapper>,
	);
	expect(wrapper.find("#pageDoubleRightArrow").exists()).toBeTruthy();
	expect(wrapper.find("#pageRightArrow").exists()).toBeTruthy();
});

test("double right arrow changes page to the last page", () => {
	props = {
		...props,
		currentPage: 1,
		totalPages: 3,
	};
	const wrapper = mount(
		<TestWrapper>
			<Pagination {...props} />
		</TestWrapper>,
	);
	wrapper.find("#pageDoubleRightArrow").simulate("click");
	expect(props.changePage).toHaveBeenCalledWith(props.totalPages);
});

test("single right arrow changes page to the next page", () => {
	props = {
		...props,
		currentPage: 1,
		totalPages: 3,
	};
	const wrapper = mount(
		<TestWrapper>
			<Pagination {...props} />
		</TestWrapper>,
	);
	wrapper.find("#pageRightArrow").simulate("click");
	expect(props.changePage).toHaveBeenCalledWith(props.currentPage + 1);
});
