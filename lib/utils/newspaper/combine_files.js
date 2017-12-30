const { execSync } = require("child_process");

module.exports = (articles, title) => {
	const start = `${BASE_PATH}/tmp_files/start.html`;
	const end = `${BASE_PATH}/lib/utils/newspaper/end.html`;
	const nav = `${BASE_PATH}/tmp_files/nav.html`;
	const files_args = articles
		.map(({ id }) => `${BASE_PATH}/tmp_files/${id}.html`)
		.join(" ");

	const output = `${BASE_PATH}/newspapers/${title}.html`.replace(/ /g, "\\ ");

	return execSync(`cat ${start} ${nav} ${files_args} ${end} > ${output}`);
};
