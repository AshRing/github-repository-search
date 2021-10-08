import * as React from "react";

import { MemoryRouter } from "react-router";
import { ThemeProvider } from "styled-components";
import { theme } from "../_style";

const TestWrapper = ({ children }: { children: React.ReactChild }) => (
	<ThemeProvider theme={theme}>
		<MemoryRouter initialEntries={[{ pathname: "/", key: "head-test-key" }]}>
			{children}
		</MemoryRouter>
	</ThemeProvider>
);

export { TestWrapper };
