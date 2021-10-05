import * as React from "react";

import { Route, Switch } from "react-router";

import { AppWrapper } from "./App.styles";
import { BrowserRouter } from "react-router-dom";

const App = () => {
	return (
		<BrowserRouter>
			<AppWrapper>
				<Switch>
					<Route exact path="/">
					</Route>
					<Route path="/:id"></Route>
				</Switch>
			</AppWrapper>
		</BrowserRouter>
	);
};

export default App;
