const { execSync } = require("child_process");

module.exports = title => {
	const basename = `./newspapers/${title}`.replace(/ /g, "\\ ");

	execSync(
		`zip ${basename} ${basename}.html ${basename}.epub ${basename}.txt ${basename}.mobi`
	);
};
