import * as React from "react";

import { ArrowContainer, PaginationContainer } from "./Pagination.styles";
import {
	faAngleDoubleLeft,
	faAngleDoubleRight,
	faAngleLeft,
	faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
	changePage: (direction: number) => void;
	currentPage: number;
	totalPages: number;
}

export const Pagination = ({ changePage, currentPage, totalPages }: Props) => {
	return (
		<PaginationContainer>
			<ArrowContainer>
				{currentPage > 1 && (
					<>
						<button onClick={() => changePage(1)}>
							<FontAwesomeIcon icon={faAngleDoubleLeft} />
						</button>
						<button onClick={() => changePage(currentPage - 1)}>
							<FontAwesomeIcon icon={faAngleLeft} />
						</button>
					</>
				)}
			</ArrowContainer>
			<div>
				{currentPage} of {totalPages}
			</div>
			<ArrowContainer>
				{currentPage < totalPages && (
					<>
						<button onClick={() => changePage(currentPage + 1)}>
							<FontAwesomeIcon icon={faAngleRight} />
						</button>
						<button onClick={() => changePage(totalPages)}>
							<FontAwesomeIcon icon={faAngleDoubleRight} />
						</button>
					</>
				)}
			</ArrowContainer>
		</PaginationContainer>
	);
};
