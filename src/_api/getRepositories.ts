import { IFilterSortOption, IGetRepositoriesInput, IRepositoryApiResult } from "../_types";

import { filters } from "../Components/SearchRespositories/FilterSort";

const buildQuery = (
	searchTerm: string,
	filterBy: IFilterSortOption[],
	sortByValue?: string,
): string => {
	let query = `?q=${searchTerm} in:name`;

	const languageFilter: IFilterSortOption = filterBy.find(
		(filter: IFilterSortOption) => filter.name === filters.language,
	);
	if (languageFilter) {
		const languageQualifiers: string[] = languageFilter.values.map(
			(value) => `language:${value.toLowerCase()}`,
		);
		query = `${query} ${languageQualifiers.join(" ")}`;
	}

	if (sortByValue) {
		query = `${query}&sort=${sortByValue}`;
	}

	return query;
};

export const getRepositories = async (
	input: IGetRepositoriesInput,
): Promise<IRepositoryApiResult> => {
	const response = await fetch(
		`https://api.github.com/search/repositories${buildQuery(
			input.searchTerm,
			input.filterBy,
			input.sortByValue,
		)}`,
	);

	return response.json();
};
