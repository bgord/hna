const Newspaper = require("../../models/Newspaper");

module.exports = ({ query, project, limit, sort }) =>
	Newspaper.find(query, project)
		.sort(sort)
		.limit(limit)
		.exec();
