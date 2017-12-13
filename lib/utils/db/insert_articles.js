const Article = require("../../models/Article");

module.exports = articles =>
	Article.insertMany(articles, { ordered: false }).catch(e => {
		if (e.writeErrors.length) {
			console.log("Filtering out duplicates...");
			return e.writeErrors.length;
		} else {
			console.log(e);
		}
	});
