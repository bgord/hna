const l = console.log;
const { bgBlackBright, bold } = require("chalk").default;
const get_n_chars = require("./get_n_chars");

module.exports = (width, header_widths) => {
	const dashed_line = get_n_chars(width)("-");

	const counter_str = print_counter_header();
	const source_str = print_source_header(header_widths.source);
	const title_str = print_title_header(header_widths.title);

	l(dashed_line);
	l(to_bg(counter_str + source_str + title_str));
	l(dashed_line);
};

function to_bg(txt) {
	return bold(bgBlackBright(txt));
}

function print_counter_header() {
	return `| #  |`;
}

function print_source_header(width) {
	const right_padding = 1;
	return ` source${get_n_chars(right_padding)(" ")}|`;
}

function print_title_header(width) {
	const right_padding = width - 7;
	return ` title${get_n_chars(right_padding)(" ")}|`;
}
