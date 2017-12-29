const {
	get_safe_number,
	get_safe_config_elem,
} = require("../utils/validators");
const { list_queries, retrieve_articles } = require("../utils/db");
const {
	draw_table_head,
	get_headers_widths,
	display_table_items,
} = require("../utils/misc");
const assert = require("assert");

module.exports = config => db => async (number, { query }) => {
	try {
		console.time("Finished in");
		const { min_articles, max_articles, queries } = config.list;
		const n = await get_safe_number({ min_articles, max_articles })(number);
		const query_type = await get_safe_config_elem("Query")(queries)(query);

		const query_obj = list_queries[query_type];

		const articles = await retrieve_articles({
			query: query_obj,
			limit: n,
			sort: {},
		});
		assert(articles.length !== 0, "Nothing to list!");

		const prepared_articles = articles.map(({ title, source }, index) => ({
			count: index + 1,
			title,
			source,
		}));

		const width = process.stdout.columns;
		const headers_widths = get_headers_widths(width, config);

		draw_table_head(width, headers_widths);
		display_table_items(width, headers_widths, prepared_articles);

		await db.close();
		console.timeEnd("Finished in");
	} catch (e) {
		console.log(e.message);
		await db.close();
		process.exit(1);
	}
};
