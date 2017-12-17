const Article = require("../../models/Article");

module.exports = answers =>
	Promise.all(
		Object.keys(answers).map(answer =>
			Article.findOneAndUpdate(
				{ _id: answer },
				{ $set: { is_reviewed: true, ...answers[answer] } }
			)
		)
	);
