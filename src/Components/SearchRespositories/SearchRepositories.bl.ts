import { IFilterSortOption } from "../../_types";
import { availableFilters } from "./FilterSort";

export const getFiltersInQuery = (queryParams: URLSearchParams): IFilterSortOption[] => {
	const filtersInQuery = availableFilters.filter((filterName: string) =>
		queryParams.has(filterName),
	);
	const queryFiltersToSave: IFilterSortOption[] = filtersInQuery.map(
		(queryFilterName: string) => ({
			name: queryFilterName,
			values: queryParams.getAll(queryFilterName),
		}),
	);

	return queryFiltersToSave;
};

export const updateQueryParam = (
	currentParams: string,
	paramName: string,
	replaceCallback: (paramsToReplace: string) => void,
	values: string[],
) => {
	const queryParams = new URLSearchParams(currentParams);

	if (queryParams.has(paramName)) {
		queryParams.delete(paramName);
	}

	if (values.length) {
		queryParams.append(paramName, values.join(" "));
	}

	replaceCallback(queryParams.toString());
};
