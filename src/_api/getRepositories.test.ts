import { IFilterSortOption, IGetRepositoriesInput, IRepositoryApiResult } from "../_types";
import { buildQuery, getRepositories } from ".";

import { filters } from "../Components/SearchRespositories/FilterSort";

test("returns successful response", async () => {
	const mockResponse: IRepositoryApiResult = {
		items: [],
		total_count: 0,
	};
	global.fetch = jest.fn().mockImplementation(() =>
		Promise.resolve({
			json: () => Promise.resolve(mockResponse),
		} as Response),
	);

	const mockInput: IGetRepositoriesInput = {
		searchTerm: "test",
		pageNum: 1,
		filterBy: [],
	};
	const response = await getRepositories(mockInput);
	expect(global.fetch).toHaveBeenCalled();
	expect(response).toBe(mockResponse);

	jest.clearAllMocks();
	delete global.fetch;
});

test("builds query without language filter", () => {
	const searchTerm = "test";
	const pageNum = 1332423;
	const query = buildQuery(searchTerm, pageNum, []);
	expect(query).not.toContain(filters.language);
	expect(query).toContain(pageNum.toString());
	expect(query).toContain(searchTerm);
	expect(query).not.toContain("sort");
});

test("builds query with language filter", () => {
	const searchTerm = "test";
	const pageNum = 1332423;
	const languageFilter: IFilterSortOption = { name: filters.language, values: ["HTML"] };
	const query = buildQuery(searchTerm, pageNum, [languageFilter]);
	expect(query).toContain(filters.language);
	expect(query).toContain(pageNum.toString());
	expect(query).toContain(searchTerm);
	expect(query).not.toContain("sort");
});

test("build query with sortByValue", () => {
	const searchTerm = "test";
	const pageNum = 1332423;
	const sortBy = "stars";
	const languageFilter: IFilterSortOption = { name: filters.language, values: ["HTML"] };
	const query = buildQuery(searchTerm, pageNum, [languageFilter], sortBy);
	expect(query).toContain(filters.language);
	expect(query).toContain(pageNum.toString());
	expect(query).toContain(searchTerm);
	expect(query).toContain(sortBy);
});
