const { green, bold } = require("chalk").default;

module.exports = answers => {
	const total = Object.keys(answers).length;
	const positives = Object.keys(answers).filter(
		answer => answers[answer].status === "interesting"
	).length;

	console.log(
		`\nYou have found ${green(positives)} of ${bold(
			total
		)} total articles interesting`
	);
};
