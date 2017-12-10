const { get } = require("axios");
const { get_first_n } = require("../misc");

module.exports = ({ sources }) => n => {
	const { base_url, base_single_url } = sources.hn;
	return get(base_url)
		.then(({ data }) => get_first_n(n)(data))
		.then(ids =>
			Promise.all(ids.map(id => get_single_hn_url(base_single_url, id)))
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
