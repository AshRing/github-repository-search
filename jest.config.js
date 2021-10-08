/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	preset: "ts-jest",
	testEnvironment: "jsdom",
	roots: ["<rootDir>/src"],
	setupFilesAfterEnv: ["<rootDir>/src/enzymeAdapter.ts"],
	collectCoverageFrom: ["src/**/*.tsx", "src/**/*.ts"],
	coverageReporters: ["json", "lcov", "text"],
	coveragePathIgnorePatterns: [
		"<rootDir>/src/_types",
		"<rootDir>/src/_mocks",
		"<rootDir>/src/_style",
		"<rootDir>/src/App.tsx",
		"<rootDir>/src/index.tsx",
		"styles.ts",
		"index.ts",
	],
};
