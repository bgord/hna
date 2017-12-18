const Article = require("../../models/Article");

module.exports = n =>
	Article.find({ is_interesting: true, is_sent: false })
		.limit(n)
		.exec()
		.then(articles =>
			articles.map(({ id, url, title }) => ({
				id,
				url,
				title,
			}))
		);
