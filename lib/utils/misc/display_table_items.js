const l = console.log;
const { greenBright, bold } = require("chalk").default;
const get_n_chars = require("./get_n_chars");

module.exports = (width, headers_widths, articles) => {
	articles.forEach(display_row(width, headers_widths));
};

function display_row(width, headers_widths) {
	return function({ count, source, title }) {
		const bottom_line = get_n_chars(width)("-");
		const count_str = get_count_str(headers_widths.count, count);
		const source_str = get_source_str(headers_widths.source, source);
		const title_str = get_title_str(headers_widths.title, title);
		l(count_str + source_str + title_str);
		l(bottom_line);
	};
}

function get_count_str(width, count) {
	const right_padding = count > 10 ? 1 : 2;
	const fill_blank = get_n_chars(right_padding)(" ");
	return `| ${bold(greenBright(count))}${fill_blank}|`;
}

function get_source_str(width, source) {
	const right_padding = width - 2 - `${source}`.length;
	const fill_blank = get_n_chars(right_padding)(" ");
	return ` ${source}${fill_blank}|`;
}

function get_title_str(width, title) {
	const max_title_space = width - 3;
	const formatted_title =
		title.length > max_title_space
			? cut_title(max_title_space, title)
			: fill_title_with_blanks(max_title_space, title);
	return ` ${formatted_title}|`;
}

function cut_title(max_title_space, title) {
	const cut_to_index = max_title_space - 4;
	const str = title
		.split("")
		.filter((e, i) => i <= cut_to_index)
		.join("");
	return `${str}... `;
}

function fill_title_with_blanks(max_title_space, title) {
	const right_padding = max_title_space - title.length + 1;
	const fill_blank = get_n_chars(right_padding)(" ");
	return `${title}${fill_blank}`;
}
