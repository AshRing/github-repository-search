import { IFilterSortOption } from "./filter";

export interface IRepository {
	id: string;
	name: string;
	full_name: string;
	owner: IRepositoryOwner;
	private: boolean;
	html_url: string;
	description: string;
	created_at: string;
	updated_at: string;
	stargazers_count: number;
	watchers_count: number;
	forks_count: number;
	open_issues_count: number;
	language: string;
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
