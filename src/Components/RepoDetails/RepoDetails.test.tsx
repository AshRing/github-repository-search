import * as React from "react";
import * as apiCalls from "../../_api/getRepository";

import { TestWrapper, mockRepo1, waitForComponentToPaint } from "../../_mocks";
import { mount, shallow } from "enzyme";

import { BackButton } from "./RepoDetails.styles";
import { RepoDetails } from ".";

const goBackSpy = jest.fn();
const mockOwner = "mockOwner";
const mockRepoName = "mockRepoName";
jest.mock("react-router-dom", () => ({
	__esModule: true,
	...(jest.requireActual("react-router-dom") as {}),
	useHistory: () => ({
		goBack: goBackSpy,
	}),
	useParams: () => ({
		owner: mockOwner,
		repoName: mockRepoName,
	}),
}));

test("RepoDetails matches snapshot", () => {
	const wrapper = shallow(<RepoDetails />);
	expect(wrapper).toMatchSnapshot();
});

test("gets repo on mount", async () => {
	const mockApiCall = jest.spyOn(apiCalls, "getRepository").mockResolvedValue(mockRepo1);
	const wrapper = mount(
		<TestWrapper>
			<RepoDetails />
		</TestWrapper>,
	);
	await waitForComponentToPaint(wrapper);
	expect(mockApiCall).toHaveBeenCalled();
});

test("back button click goes back a page", async () => {
	jest.spyOn(apiCalls, "getRepository").mockResolvedValue(mockRepo1);
	const wrapper = mount(
		<TestWrapper>
			<RepoDetails />
		</TestWrapper>,
	);
	await waitForComponentToPaint(wrapper);
	wrapper.find(BackButton).simulate("click");
	expect(goBackSpy).toHaveBeenCalled();
});

test("doesn't display homepage if it is empty", async () => {
	jest.spyOn(apiCalls, "getRepository").mockResolvedValue({
		...mockRepo1,
		homepage: "",
	});
	const wrapper = mount(
		<TestWrapper>
			<RepoDetails />
		</TestWrapper>,
	);
	await waitForComponentToPaint(wrapper);
	expect(wrapper.find("#visitHomepageLink").exists()).toBeFalsy();
});

test("renders homepage if the field is populated", async () => {
	jest.spyOn(apiCalls, "getRepository").mockResolvedValue({
		...mockRepo1,
		homepage: "some_homepage",
	});
	const wrapper = mount(
		<TestWrapper>
			<RepoDetails />
		</TestWrapper>,
	);
	await waitForComponentToPaint(wrapper);
	expect(wrapper.find("#visitHomepageLink").exists()).toBeTruthy();
});
