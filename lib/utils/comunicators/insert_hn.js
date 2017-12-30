const { get } = require("axios");
const ProgressBar = require("../misc/ProgressBar");
const assert = require("assert");

module.exports = ({ sources }) => n => {
	const { base_url, base_single_url } = sources.hn;

	const total = n;
	let current = 0;

	ProgressBar.init(total);

	return get(base_url)
		.then(({ data }) => get_first_n(n)(data))
		.then(ids =>
			Promise.all(
				ids.map(id =>
					get_single_hn_url(base_single_url, id).then(data => {
						current++;
						ProgressBar.update(current);
						return data;
					})
				)
			)
		)
		.then(articles =>
			articles
				.map(({ title, url, kids }) => ({
					title,
					url,
					source: "hn",
					kids,
				}))
				.filter(article => article.url)
		);
};

function get_single_hn_url(base_single_url, id) {
	return get(`${base_single_url}/${id}.json`).then(({ data }) => data);
}

function get_first_n(n) {
	return arr => {
		const not_arr_err = "The second argument has to be an array";
		assert(Array.isArray(arr), true, not_arr_err);

		const nan_err = "N has to be a number";
		assert(!isNaN(n), true, nan_err);

		return arr.filter((el, ind) => ind < n);
	};
}
