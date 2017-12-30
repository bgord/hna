const { bgBlackBright, whiteBright, bold, cyan } = require("chalk").default;
const assert = require("assert");

module.exports = results => {
	const total = results.length;
	assert(total !== 0, "Nothing to show :(");
	results.forEach(({ title, url, source }, index) =>
		console.log(
			`${bold(index + 1)}) ${whiteBright(
				bgBlackBright(title)
			)}\nsource: ${cyan(source)} ${url}\n`
		)
	);
};
