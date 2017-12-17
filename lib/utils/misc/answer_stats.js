const l = console.log;
const { green, bold } = require("chalk").default;

module.exports = answers => {
	const total = Object.keys(answers).length;
	const positives = Object.keys(answers).filter(
		answer => answers[answer].is_interesting
	).length;
	l(
		`\nYou have found ${green(positives)} of ${bold(
			total
		)} total articles interesting`
	);
};
