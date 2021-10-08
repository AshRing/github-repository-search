import { act } from "react-dom/test-utils";

export const waitForComponentToPaint = async (wrapper) => {
	await act(async () => {
		await new Promise((resolve) => setTimeout(resolve));
		wrapper.update();
	});
};
