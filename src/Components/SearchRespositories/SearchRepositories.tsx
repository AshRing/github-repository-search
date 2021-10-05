import * as React from "react";

import {
	SearchInput,
	SearchInputContainer,
	SearchRepositoriesContainer,
} from "./SearchRepositories.styles";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export const SearchRepositories = () => {

	return (
		<SearchRepositoriesContainer>
			<h1>GitHub Repository Search</h1>
			<SearchInputContainer>
				<FontAwesomeIcon icon={faSearch} />
				<SearchInput
					type="text"
					placeholder="Search Repositories"
					onChange={(e: React.ChangeEvent) =>
						})
					}
				/>
			</SearchInputContainer>
		</SearchRepositoriesContainer>
	);
};
