const { retrieve_articles } = require("../utils/db");

const {
	print_most_popular_title_words,
	print_status_counts,
} = require("../utils/misc");

module.exports = config => db => async () => {
	const articles = await retrieve_articles({
		query: {},
		project: {},
		limit: null,
		sort: {},
	});
	print_status_counts(articles, "interesting");
	print_status_counts(articles, "unreviewed");
	print_status_counts(articles, "boring");
	print_status_counts(articles, "sent");
	print_status_counts(articles, "all");
	console.log("\n");
	print_most_popular_title_words(articles);
};
