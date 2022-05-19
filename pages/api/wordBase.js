const apiKey = "keyM5UVtcn4CVuc50";

const Airtable = require("airtable");

const base = new Airtable({ apiKey: apiKey }).base("apptgD3rqtV1FOxp2");

const table = base("search");

const createOrSearchWord = async (req, res) => {
	const { id, hash, keyword } = req.body;
	switch (req.method) {
		case "POST":
			try {
				const findTitle = await table
					.select({
						filterByFormula: `hash="${hash}"`,
					})
					.firstPage();
				console.log(findTitle);
				if (findTitle.length != 0) {
					const titleInTheDataBase = findTitle.map((e) => {
						return { ...e.fields, found: "there" };
					});
					res.json(titleInTheDataBase);
				} else {
					const createTitle = await table.create([
						{
							fields: {
								id: id || "",
								hash,
								keyword,
							},
						},
					]);
					const titleInTheDataBase = createTitle.map((e) => {
						return { ...e.fields };
					});
					res.json(titleInTheDataBase);
				}
			} catch (e) {
				throw new Error(e);
			}
			break;
		case "GET":
			break;
		default:
			console.log("nope");
			break;
	}
};

export default createOrSearchWord;
