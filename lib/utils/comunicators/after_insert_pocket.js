const { post } = require("axios");
const assert = require("assert");

module.exports = ({ sources }) => articles => {
	const { consumer_key, access_token, archive_url } = sources.pocket;
	const actions = articles.map(({ item_id }) => ({
		item_id,
		action: "archive",
	}));
	assert(actions.length !== 0, "There is nothing to mark as read");
	return post(archive_url, { consumer_key, access_token, actions }).then(
		resp => {
			const count = resp.data.action_results.reduce(
				(acc, curr) => (curr ? acc + 1 : acc)
			);
			console.log(`Successfully archived ${count} articles.`);
		}
	);
};
