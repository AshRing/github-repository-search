import { IFilterSortOption } from "./filter";

export interface IRepository {
	created_at: string;
	description: string;
	forks_count: number;
	full_name: string;
	homepage: string;
	html_url: string;
	id: string;
	language: string;
	name: string;
	open_issues_count: number;
	owner: IRepositoryOwner;
	stargazers_count: number;
	updated_at: string;
	watchers_count: number;
}

export interface IRepositoryOwner {
	login: string;
	id: string;
	avatar_url: string;
	url: string;
}

export interface IGetRepositoriesInput {
	filterBy: IFilterSortOption[];
	pageNum: number;
	searchTerm: string;
	sortByValue?: string;
}

export interface IRepositoryApiResult {
	total_count: number;
	items: IRepository[];
}
