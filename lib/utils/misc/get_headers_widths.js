module.exports = (width, { sources }) => {
	const widths = {
		count: 6,
		source: get_max_source_length(sources),
	};
	widths.title = get_title_width(width, widths);
	return widths;
};

function get_max_source_length(sources) {
	return (
		Object.keys(sources).reduce(
			(acc, curr) => (curr.length > acc ? curr.length : acc),
			5
		) + 3
	);
}

function get_title_width(width, { count, source }) {
	return width - count - source;
}
