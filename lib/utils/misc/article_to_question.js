const inquirer = require("inquirer");
const { bgBlackBright, gray, dim } = require("chalk").default;

module.exports = ({ id, title, url, count }) => ({
	type: "list",
	name: id,
	message: `\n${count})\t${bgBlackBright(title)}\n\n${dim(url)}`,
	choices: ["n", "y", new inquirer.Separator()],
	filter: answer =>
		answer === "y" ? { status: "interesting" } : { status: "boring" },
});
