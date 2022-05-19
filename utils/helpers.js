import { useContext } from "react";
import { DataContext } from "../pages/index";

export const fetchInfo = async (term) => {
	const URL = `https://api.jikan.moe/v3/search/anime?q=${term}&limit=10`;

	try {
		const fetching = await fetch(URL);
		const data = await fetching.json();
		return data.results;
	} catch (e) {
		return [];
	}
};

export const getDataHook = async () => {
	const { data } = useContext(DataContext);
	if (data.length > 0) {
		const paths = data.map((e) => {
			return {
				params: {
					id: e["mal_id"].toString(),
				},
			};
		});
		return paths;
	}
};

export function makeid(length) {
	var result = "";
	var characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}
