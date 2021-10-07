export const sortInputs = {
	bestMatch: "Best Match",
	stars: "Stars",
};

export const availableSorts = Object.keys(sortInputs).map((key: string) => sortInputs[key]);

export const sortValues = {
	[sortInputs.bestMatch]: undefined,
	[sortInputs.stars]: "stars",
};

export const filters = {
	language: "language",
};

export const availableFilters = Object.keys(filters).map((key: string) => filters[key]);

export const languageFilterOptions = [
	"Assembly",
	"C",
	"C#",
	"C++",
	"Dart",
	"HTML",
	"Haskell",
	"Go",
	"Java",
	"JavaScript",
	"Python",
	"Ruby",
	"Rust",
	"Shell",
	"TypeScript",
];
