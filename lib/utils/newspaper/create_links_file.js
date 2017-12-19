const { promisify } = require("util");
const { writeFile } = require("fs");
const write = promisify(writeFile);

module.exports = (articles, title) => {
	const content = articles
		.map(
			(article, index) =>
				`${index + 1}) ${article.title}\n${article.uri}\n\n`
		)
		.join("");
	return write(`./newspapers/${title}.txt`, content);
};
