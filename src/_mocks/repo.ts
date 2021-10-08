import { IRepository } from "../_types";

export const mockRepo1: IRepository = {
	created_at: "10/01/2021",
	description: "",
	forks_count: 123,
	full_name: "@ash/test-project",
	homepage: "",
	html_url: "https://github.com",
	id: "1",
	language: "JavaScript",
	name: "test-project",
	open_issues_count: 0,
	owner: {
		login: "ash",
		id: "123",
		avatar_url: "some_url",
		url: "some_url",
	},
	stargazers_count: 55,
	updated_at: "10/03/2021",
	watchers_count: 12,
};
