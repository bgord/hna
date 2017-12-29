const Article = require("../../models/Article");

module.exports = ({ query, limit, sort }) =>
	Article.find(query)
		.sort(sort)
		.limit(limit)
		.exec();
