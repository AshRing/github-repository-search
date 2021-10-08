import * as React from "react";

import { Redirect, Route, Switch } from "react-router";

import { BrowserRouter } from "react-router-dom";
import { RepoDetails } from "./RepoDetails";
import { SearchRepositories } from "./SearchRespositories";

const App = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Redirect exact from="/github-repository-search" to="/" />
				<Route exact path="/">
					<SearchRepositories />
				</Route>
				<Route path="/:owner/:repoName">
					<RepoDetails />
				</Route>
			</Switch>
		</BrowserRouter>
	);
};

export default App;
