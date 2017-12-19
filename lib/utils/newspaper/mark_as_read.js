const Article = require("../../models/Article");

module.exports = articles =>
	Promise.all(
		articles.map(article =>
			Article.findOneAndUpdate(
				{ _id: article.id },
				{ $set: { is_sent: true } }
			)
		)
	);
