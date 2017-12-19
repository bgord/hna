const { execSync } = require("child_process");

module.exports = title => {
	const basename = `./newspapers/${title.split(".")[0]}`.replace(/ /g, "\\ ");

	execSync(
		`pandoc ${basename}.html -o ${basename}.epub && ebook-convert ${basename}.epub ${basename}.mobi`
	);
};
