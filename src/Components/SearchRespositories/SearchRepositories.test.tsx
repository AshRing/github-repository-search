import * as React from "react";
import * as apiCalls from "../../_api/getRepositories";
import * as routeData from "react-router-dom";
import * as searchRepoBl from "./SearchRepositories.bl";

import { FilterSort, filters, sortInputs } from "./FilterSort";
import { TestWrapper, mockRepo1 } from "../../_mocks";
import { filterSortInitialState, repoReducerInitialState } from "./reducers";
import { mount, shallow } from "enzyme";

import { IFilterSortOption } from "../../_types";
import { RepoList } from "./RepoList";
import { SearchRepositories } from ".";
import { act } from "react-dom/test-utils";

const waitForComponentToPaint = async (wrapper) => {
	await act(async () => {
		await new Promise((resolve) => setTimeout(resolve));
		wrapper.update();
	});
};

const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
	observe: () => null,
	unobserve: () => null,
	disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;

const locationSearch = "";
jest.mock("react-router-dom", () => ({
	__esModule: true,
	...(jest.requireActual("react-router-dom") as {}),
	useHistory: () => ({
		replace: jest.fn(),
	}),
	useLocation: () => ({
		state: {
			search: locationSearch,
		},
	}),
}));

const getRepositoriesSpy = jest
	.spyOn(apiCalls, "getRepositories")
	.mockResolvedValue({ total_count: 1, items: [mockRepo1] });

afterEach(() => {
	jest.spyOn(routeData, "useLocation").mockReturnValue({
		state: {},
		pathname: "/",
		hash: "",
		search: locationSearch,
	});
});

test("SearchRepositories matches snapshot", () => {
	const wrapper = shallow(<SearchRepositories />);
	expect(wrapper).toMatchSnapshot();
});

describe("query params", () => {
	test("applies query params - search term", async () => {
		const searchTerm = "test";
		const filter: IFilterSortOption = { name: filters.language, values: ["HTML"] };
		const sortBy = sortInputs.stars;
		jest.spyOn(routeData, "useLocation").mockReturnValue({
			state: {},
			pathname: "/",
			hash: "",
			search: `?searchTerm=${searchTerm}&${filter.name}=${filter.values[0]}&sortBy=${sortBy}`,
		});

		const wrapper = mount(
			<TestWrapper>
				<SearchRepositories />
			</TestWrapper>,
		);

		await waitForComponentToPaint(wrapper);

		expect(getRepositoriesSpy).toHaveBeenCalled();
		expect(wrapper.find(FilterSort).prop("filterBy")).toEqual([filter]);
		expect(wrapper.find(FilterSort).prop("sortBy")).toEqual(sortBy);
		expect(wrapper.find(FilterSort).prop("searchTerm")).toEqual(searchTerm);
	});

	test("applies query params - no search term", async () => {
		const filter: IFilterSortOption = { name: filters.language, values: ["HTML"] };
		const sortBy = sortInputs.stars;
		jest.spyOn(routeData, "useLocation").mockReturnValue({
			state: {},
			pathname: "/",
			hash: "",
			search: `?${filter.name}=${filter.values[0]}&sortBy=${sortBy}`,
		});
		const wrapper = mount(
			<TestWrapper>
				<SearchRepositories />
			</TestWrapper>,
		);

		await waitForComponentToPaint(wrapper);

		expect(getRepositoriesSpy).toHaveBeenCalled();
		expect(wrapper.find(FilterSort).prop("filterBy")).toEqual([filter]);
		expect(wrapper.find(FilterSort).prop("sortBy")).toEqual(sortBy);
		expect(wrapper.find(FilterSort).prop("searchTerm")).toEqual(
			filterSortInitialState.searchTerm,
		);
	});
});

describe("search term", () => {
	test("changes search term", async () => {
		const searchTerm = "tetris";
		const updateQuerySpy = jest.spyOn(searchRepoBl, "updateQueryParam");
		const wrapper = mount(
			<TestWrapper>
				<SearchRepositories />
			</TestWrapper>,
		);

		await waitForComponentToPaint(wrapper);

		wrapper.find(FilterSort).prop("changeSearchTerm")(searchTerm);
		wrapper.update();
		expect(updateQuerySpy).toHaveBeenCalledWith(
			locationSearch,
			"searchTerm",
			expect.any(Function),
			[searchTerm],
		);
		expect(wrapper.find(FilterSort).prop("searchTerm")).toEqual(searchTerm);
	});

	test("resets repos if search term becomes empty", async () => {
		const searchTerm = "tetris";
		const updateQuerySpy = jest.spyOn(searchRepoBl, "updateQueryParam");
		const wrapper = mount(
			<TestWrapper>
				<SearchRepositories />
			</TestWrapper>,
		);

		await waitForComponentToPaint(wrapper);

		wrapper.find(RepoList).prop("changePage")(2);
		wrapper.find(FilterSort).prop("changeSearchTerm")(searchTerm);
		wrapper.update();
		expect(updateQuerySpy).toHaveBeenCalledWith(
			locationSearch,
			"searchTerm",
			expect.any(Function),
			[searchTerm],
		);
		expect(wrapper.find(FilterSort).prop("searchTerm")).toEqual(searchTerm);

		wrapper.find(FilterSort).prop("changeSearchTerm")("");
		wrapper.update();

		await waitForComponentToPaint(wrapper);
		expect(updateQuerySpy).toHaveBeenCalledWith(
			locationSearch,
			"searchTerm",
			expect.any(Function),
			[],
		);
		expect(wrapper.find(FilterSort).prop("searchTerm")).toEqual("");
		expect(wrapper.find(RepoList).prop("pageNum")).toEqual(repoReducerInitialState.pageNum);
	});
});

test("changes sort", async () => {
	const sortBy = sortInputs.stars;
	const updateQuerySpy = jest.spyOn(searchRepoBl, "updateQueryParam");
	const wrapper = mount(
		<TestWrapper>
			<SearchRepositories />
		</TestWrapper>,
	);

	await waitForComponentToPaint(wrapper);

	wrapper.find(FilterSort).prop("changeSort")(sortBy);
	wrapper.update();
	expect(updateQuerySpy).toHaveBeenCalledWith(locationSearch, "sortBy", expect.any(Function), [
		sortBy,
	]);
	expect(wrapper.find(FilterSort).prop("sortBy")).toEqual(sortBy);
});

test("changes filter", async () => {
	const filter: IFilterSortOption = { name: filters.language, values: ["HTML"] };
	const updateQuerySpy = jest.spyOn(searchRepoBl, "updateQueryParam");
	const wrapper = mount(
		<TestWrapper>
			<SearchRepositories />
		</TestWrapper>,
	);
	await waitForComponentToPaint(wrapper);

	wrapper.find(FilterSort).prop("addFilter")(filter);
	wrapper.update();
	expect(updateQuerySpy).toHaveBeenCalledWith(
		locationSearch,
		filter.name,
		expect.any(Function),
		filter.values,
	);
	expect(wrapper.find(FilterSort).prop("filterBy")).toEqual([filter]);
});

test("search repositories prop makes api request to search repositories", async () => {
	const wrapper = mount(
		<TestWrapper>
			<SearchRepositories />
		</TestWrapper>,
	);
	await waitForComponentToPaint(wrapper);

	wrapper.find(FilterSort).prop("searchRepositories")();
	expect(getRepositoriesSpy).toHaveBeenCalled();
});

test("if search term is present, changing pageNum will initiate repository api request", async () => {
	const searchTerm = "test";
	const wrapper = mount(
		<TestWrapper>
			<SearchRepositories />
		</TestWrapper>,
	);
	await waitForComponentToPaint(wrapper);

	wrapper.find(FilterSort).prop("changeSearchTerm")(searchTerm);
	wrapper.find(RepoList).prop("changePage")(2);
	expect(getRepositoriesSpy).toHaveBeenCalled();
});

test("changes page", async () => {
	const pageNum = 2;
	const updateQuerySpy = jest.spyOn(searchRepoBl, "updateQueryParam");
	const wrapper = mount(
		<TestWrapper>
			<SearchRepositories />
		</TestWrapper>,
	);
	await waitForComponentToPaint(wrapper);

	wrapper.find(RepoList).prop("changePage")(pageNum);
	wrapper.update();
	expect(updateQuerySpy).toHaveBeenCalledWith(locationSearch, "pageNum", expect.any(Function), [
		pageNum.toString(),
	]);
	expect(wrapper.find(RepoList).prop("pageNum")).toEqual(pageNum);
});
