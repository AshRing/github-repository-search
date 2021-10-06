const customMediaQuery = (minWidth: number) => `@media (min-width: ${minWidth}px)`;

export const mediaQueries = {
	tabletPortrait: customMediaQuery(600),
	tabletLandscape: customMediaQuery(900),
	desktop: customMediaQuery(1200),
	desktopBig: customMediaQuery(1800),
};
