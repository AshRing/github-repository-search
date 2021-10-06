import * as React from "react";

import { Route, Switch } from "react-router";

import { AppWrapper } from "./App.styles";
import { BrowserRouter } from "react-router-dom";
import { RepoDetails } from "./RepoDetails";
import { SearchRepositories } from "./SearchRespositories";

const App = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/">
					<SearchRepositories />
				</Route>
				<Route path="/:id">
					<RepoDetails />
				</Route>
			</Switch>
		</BrowserRouter>
	);
};

export default App;
