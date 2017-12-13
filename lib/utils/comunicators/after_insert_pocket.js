const { post } = require("axios");
const l = console.log;

module.exports = ({ sources }) => articles => {
	const { consumer_key, access_token, archive_url } = sources.pocket;
	const actions = articles.map(({ item_id }) => ({
		item_id,
		action: "archive",
	}));
	return post(archive_url, { consumer_key, access_token, actions }).then(
		resp => {
			const count = resp.data.action_results.reduce(
				(acc, curr) => (curr ? acc + 1 : acc)
			);
			l(`Successfully archived ${count} articles.`);
		}
	);
};
