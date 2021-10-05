import "core-js/stable";
import "regenerator-runtime/runtime";

import * as React from "react";
import * as ReactDOM from "react-dom";

import { GlobalStyles, theme } from "./_style";

import App from "./Components/App";
import { ThemeProvider } from "styled-components";

ReactDOM.render(
	<ThemeProvider theme={theme}>
		<GlobalStyles />
		<App />
	</ThemeProvider>,
	document.getElementById("app"),
);
