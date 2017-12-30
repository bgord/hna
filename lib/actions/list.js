const {
	get_safe_number,
	get_safe_config_elem,
} = require("../utils/validators");
const { list_queries, retrieve_articles } = require("../utils/db");
const { display_search_results } = require("../utils/misc");

module.exports = config => db => async (number, { query }) => {
	const { min_articles, max_articles, queries } = config.list;

	const limit = await get_safe_number({ min_articles, max_articles })(number);
	const query_type = await get_safe_config_elem("Query")(queries)(query);
	const query_obj = list_queries[query_type];

	const articles = await retrieve_articles({
		query: query_obj,
		project: { title: 1, source: 1, url: 1 },
		limit,
	});
	display_search_results(articles);
};
