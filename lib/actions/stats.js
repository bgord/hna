const { retrieve_articles } = require("../utils/db");
const l = console.log;

const {
	print_most_popular_title_words,
	print_count,
} = require("../utils/misc");

module.exports = config => db => async () => {
	const articles = await retrieve_articles({
		query: {},
		project: {},
		limit: null,
		sort: {},
	});
	print_count(articles, "interesting");
	print_count(articles, "unreviewed");
	print_count(articles, "boring");
	print_count(articles, "sent");
	print_count(articles, "all");
	l("\n");
	print_most_popular_title_words(articles);
};
