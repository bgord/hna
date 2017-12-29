const Article = require("../../models/Article");
const { validate_status } = require("../misc");

module.exports = table =>
	Promise.all(
		Object.keys(table).map(art =>
			Article.findById(art)
				.then(article => validate_status(article, table[art].status))
				.then(() =>
					Article.findOneAndUpdate(
						{ _id: art },
						{ $set: { ...table[art] } }
					)
				)
		)
	);
