const { promisify } = require("util");
const { writeFile } = require("fs");
const write = promisify(writeFile);

module.exports = (articles, chars_per_second) => {
	const str = `<div style="margin-bottom: 200px;"><h2>Table of content</h2> ${articles
		.map(to_nav_item(chars_per_second))
		.join("")} </div>`;
	return write("./tmp_files/nav.html", str);
};

function to_nav_item(chars_per_second) {
	return function({ id, title, length }, index) {
		return `<a href="#${id}"><strong>${index + 1}) ${title} (${Math.ceil(
			length / chars_per_second
		)} min)</strong></a><br>`;
	};
}
