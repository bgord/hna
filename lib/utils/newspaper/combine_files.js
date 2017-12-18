const { execSync } = require("child_process");
const moment = require("moment");

module.exports = (articles, title) => {
	const start = "./tmp_files/start.html";
	const end = "./lib/utils/newspaper/end.html";
	const nav = "./tmp_files/nav.html";
	const files_args = articles
		.map(({ id }) => `./tmp_files/${id}.html`)
		.join(" ");

	const output = `./newspapers/${title}.html`.replace(/ /g, "\\ ");

	return execSync(`cat ${start} ${nav} ${files_args} ${end} > ${output}`);
};
