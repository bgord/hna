const { greenBright, bold } = require("chalk").default;

module.exports = (articles, status) => {
	const current_status_count = rightpad(
		" " + get_status_count(articles, status),
		" ",
		6
	);
	const current_status_percentage = (
		current_status_count /
		get_status_count(articles, "all") *
		100
	).toFixed(2);
	const status_name = rightpad(status.toUpperCase(), " ", 11);

	console.log(
		`${bold(status_name)}:\t${greenBright(
			current_status_count
		)} | ${current_status_percentage}%`
	);
};

function get_status_count(articles, status) {
	const filter_func = status === "all" ? a => a : a => a.status === status;
	return articles.filter(filter_func).length;
}

function rightpad(str, pad_with, max_len) {
	if (str.length >= max_len) return str;
	let output = str;
	for (let i = 0; i < max_len - str.length; i++) {
		output += pad_with;
	}
	return output;
}
