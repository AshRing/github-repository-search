import { getRepository } from ".";
import { mockRepo1 } from "../_mocks";

test("returns successful response", async () => {
	global.fetch = jest.fn().mockImplementation(() =>
		Promise.resolve({
			json: () => Promise.resolve(mockRepo1),
		} as Response),
	);
	const response = await getRepository("testOwner", "testRepoName");
	expect(global.fetch).toHaveBeenCalled();
	expect(response).toBe(mockRepo1);

	jest.clearAllMocks();
	delete global.fetch;
});
