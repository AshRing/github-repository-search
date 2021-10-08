import * as React from "react";

import { Repo } from ".";
import { mockRepo1 } from "../../../../_mocks";
import { shallow } from "enzyme";

test("Repo matches snapshot", () => {
	const wrapper = shallow(<Repo repoInfo={mockRepo1} />);
	expect(wrapper).toMatchSnapshot();
});
