import * as React from "react";

import { TestWrapper, mockRepo1 } from "../../../_mocks";
import { mount, shallow } from "enzyme";

import { Pagination } from "./Pagination";
import { Repo } from "./Repo";
import { RepoList } from ".";
import { StatusText } from "./RepoList.styles";

let props;
beforeEach(() => {
	props = {
		changePage: jest.fn(),
		pageNum: 1,
		repos: [mockRepo1],
		reposLoading: false,
		totalPages: 1,
	};
});

test("RepoList matches snapshot", () => {
	const wrapper = shallow(<RepoList {...props} />);
	expect(wrapper).toMatchSnapshot();
});

test("if repos are loading, display correct text & components", () => {
	props = {
		...props,
		reposLoading: true,
	};
	const wrapper = mount(
		<TestWrapper>
			<RepoList {...props} />
		</TestWrapper>,
	);
	expect(wrapper.find(StatusText).text()).toBe("Loading...");
	expect(wrapper.find(Repo).exists()).toBeFalsy();
	expect(wrapper.find(Pagination).exists()).toBeFalsy();
});

test("if repos are not loading, and are undefined, display correct text & components", () => {
	props = {
		...props,
		reposLoading: false,
		repos: undefined,
	};
	const wrapper = mount(
		<TestWrapper>
			<RepoList {...props} />
		</TestWrapper>,
	);
	expect(wrapper.find(StatusText).text()).toBe("Please enter a search term");
	expect(wrapper.find(Repo).exists()).toBeFalsy();
	expect(wrapper.find(Pagination).exists()).toBeFalsy();
});

test("if repos are not loading and are NOT undefined, display correct components", () => {
	props = {
		...props,
		reposLoading: false,
		repos: [mockRepo1],
	};
	const wrapper = mount(
		<TestWrapper>
			<RepoList {...props} />
		</TestWrapper>,
	);
	expect(wrapper.find(StatusText).exists()).toBeFalsy();
	expect(wrapper.find(Repo).exists()).toBeTruthy();
	expect(wrapper.find(Repo)).toHaveLength(props.repos.length);
	expect(wrapper.find(Pagination).exists()).toBeTruthy();
});
