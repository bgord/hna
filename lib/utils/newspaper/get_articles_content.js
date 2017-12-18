const { get } = require("axios");

module.exports = articles =>
	Promise.all(
		articles.map(async article => ({
			...article,
			content: await get(article.url)
				.then(resp => resp.data)
				.catch(err => null),
		}))
	);
