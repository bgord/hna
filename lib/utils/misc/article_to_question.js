const inquirer = require("inquirer");
const { bgBlackBright, gray, dim } = require("chalk").default;

module.exports = ({ id, title, url }, index) => ({
	type: "list",
	name: id,
	message: `\n${index + 1})\t${bgBlackBright(title)}\n\n${dim(gray(url))}`,
	choices: ["n", "y", new inquirer.Separator()],
	filter: answer =>
		answer === "y" ? { is_interesting: true } : { is_interesting: false },
});
