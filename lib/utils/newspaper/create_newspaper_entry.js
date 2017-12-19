const Newspaper = require("../../models/Newspaper");

module.exports = (title, articles) => {
	const kids = articles.map(article => article.id);
	const body = {
		title,
		kids,
	};
	const newspaper = new Newspaper(body);
	return newspaper.save();
};
