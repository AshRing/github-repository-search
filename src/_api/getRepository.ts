import { IRepository } from "../_types";

export const getRepository = async (owner: string, repoName: string): Promise<IRepository> => {
	try {
		const response = await fetch(`https://api.github.com/repos/${owner}/${repoName}`);

		return response.json();
	} catch (e) {
		console.error(e);
	}
};
