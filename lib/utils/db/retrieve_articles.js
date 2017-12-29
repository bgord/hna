const Article = require("../../models/Article");

module.exports = ({ query, project, limit, sort }) =>
	Article.find(query, project)
		.sort(sort)
		.limit(limit)
		.exec();
