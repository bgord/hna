const Article = require("../../models/Article");
const { validate_status } = require("../misc");

module.exports = answers =>
	Promise.all(
		Object.keys(answers).map(answer =>
			Article.findById(answer)
				.then(article =>
					validate_status(article, answers[answer].status)
				)
				.then(() =>
					Article.findOneAndUpdate(
						{ _id: answer },
						{ $set: { ...answers[answer] } }
					)
				)
		)
	);
