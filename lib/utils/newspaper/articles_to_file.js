const l = console.log;
const { writeFile } = require("fs");
const { promisify } = require("util");
const article_wrapper = require("./article_wrapper");

const write = promisify(writeFile);

module.exports = articles => {
	l(`Writing articles to files...`);
	return Promise.all(
		articles.map(({ id, title, content }) =>
			write(
				`${BASE_PATH}/tmp_files/${id}.html`,
				article_wrapper(id, title, content)
			)
		)
	);
};
