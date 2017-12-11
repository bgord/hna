const { post } = require("axios");

module.exports = ({ sources }) => count => {
	const { consumer_key, access_token, base_url } = sources.pocket;
	return post(base_url, {
		consumer_key,
		access_token,
		count,
		state: "unread",
		contentType: "article",
	})
		.then(({ data }) => data.list)
		.then(articles =>
			Object.keys(articles)
				.map(id => articles[id])
				.map(({ given_title: title, given_url: url }) => ({
					title,
					url,
					source: "pocket",
				}))
		);
};
