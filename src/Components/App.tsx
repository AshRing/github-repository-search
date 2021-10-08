import * as React from "react";

import { Route, Switch } from "react-router";

import { BrowserRouter } from "react-router-dom";
import { RepoDetails } from "./RepoDetails";
import { SearchRepositories } from "./SearchRespositories";

const App = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/github-repository-search">
					<SearchRepositories />
				</Route>
				<Route path="/github-repository-search/:owner/:repoName">
					<RepoDetails />
				</Route>
			</Switch>
		</BrowserRouter>
	);
};

export default App;
