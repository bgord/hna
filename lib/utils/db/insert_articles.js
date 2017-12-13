const Article = require("../../models/Article");

module.exports = articles =>
	Article.insertMany(articles, { ordered: false }).catch(e => {
		if (e.code === 11000) {
			console.log("Filtering out duplicates...");
			if (e.writeErrors) {
				return e.writeErrors.length;
			} else {
				return 1;
			}
		}
	});
