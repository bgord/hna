const { retrieve_articles } = require("../utils/db");
const stringSimilarity = require("string-similarity");
const { display_search_results } = require("../utils/misc");

const MIN_SIMILARITY = 0.5;

module.exports = config => db => async ({ query }) => {
	const interesting_articles = await retrieve_articles({
		query: { status: { $in: ["interesting", "sent"] } },
	});

	const to_show = interesting_articles.filter(
		article =>
			article.title
				.split(" ")
				.map(word => stringSimilarity.compareTwoStrings(word, query))
				.some(word_similarity => word_similarity >= MIN_SIMILARITY)
	);
	display_search_results(to_show);
};
