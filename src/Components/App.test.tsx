import * as React from "react";

import App from "./App";
import { shallow } from "enzyme";

test("App matches snapshot", () => {
	const wrapper = shallow(<App />);
	expect(wrapper).toMatchSnapshot();
});
