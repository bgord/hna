const Article = require("../../models/Article");

module.exports = search_query => n =>
	Article.find(search_query)
		.limit(n)
		.exec()
		.then(articles =>
			articles.map(({ id, url, title, source }, index) => ({
				id,
				url,
				title,
				source,
				counter: index + 1,
			}))
		);
