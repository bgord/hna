const Article = require("../../models/Article");

module.exports = query => sort_query => n =>
	Article.find(query)
		.sort(sort_query)
		.limit(n)
		.exec()
		.then(articles =>
			articles.map(({ title, source }, index) => ({
				count: index + 1,
				title,
				source,
			}))
		);
