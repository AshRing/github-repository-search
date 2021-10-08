import * as React from "react";
import * as routeData from "react-router-dom";

import { TestWrapper, mockRepo1 } from "../../_mocks";
import { mount, shallow } from "enzyme";

import { BackButton } from "./RepoDetails.styles";
import { RepoDetails } from ".";

const goBackSpy = jest.fn();
jest.mock("react-router-dom", () => ({
	__esModule: true,
	...(jest.requireActual("react-router-dom") as {}),
	useHistory: () => ({
		goBack: goBackSpy,
	}),
	useLocation: () => ({
		state: {
			repo: mockRepo1,
		},
	}),
}));

test("RepoDetails matches snapshot", () => {
	const wrapper = shallow(<RepoDetails />);
	expect(wrapper).toMatchSnapshot();
});

test("back button click goes back a page", () => {
	const wrapper = mount(
		<TestWrapper>
			<RepoDetails />
		</TestWrapper>,
	);
	wrapper.find(BackButton).simulate("click");
	expect(goBackSpy).toHaveBeenCalled();
});

test("doesn't display homepage if it is empty", () => {
	jest.spyOn(routeData, "useLocation").mockReturnValue({
		state: {
			repo: { ...mockRepo1, homepage: "" },
		},
		pathname: "/welcome",
		hash: "",
		search: "",
	});
	const wrapper = mount(
		<TestWrapper>
			<RepoDetails />
		</TestWrapper>,
	);
	expect(wrapper.find("#visitHomepageLink").exists()).toBeFalsy();
});

test("renders homepage if the field is populated", () => {
	jest.spyOn(routeData, "useLocation").mockReturnValue({
		state: {
			repo: { ...mockRepo1, homepage: "some_homepage" },
		},
		pathname: "/welcome",
		hash: "",
		search: "",
	});
	const wrapper = mount(
		<TestWrapper>
			<RepoDetails />
		</TestWrapper>,
	);
	expect(wrapper.find("#visitHomepageLink").exists()).toBeTruthy();
});
