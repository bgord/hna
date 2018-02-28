const Article = require("../../models/Article");

module.exports = articles =>
	Article.insertMany(articles, { ordered: false }).catch(e => {
		if (e.code === 11000) {
			console.log("Filtering out duplicates...");
			return e.writeErrors ? e.writeErrors.length : 1;
		}
	});
