const {
	get_safe_number,
	get_safe_config_elem,
} = require("../utils/validators");
const { get_list_queries, list_articles } = require("../utils/db");
const {
	draw_table_head,
	get_headers_widths,
	display_table_items,
} = require("../utils/misc");
const assert = require("assert");

module.exports = config => db => async (number, { sort, type }) => {
	try {
		console.time("Finished in");
		const { min_articles, max_articles, sorts, types } = config.list;
		const n = await get_safe_number({ min_articles, max_articles })(number);
		const query_type = await get_safe_config_elem("Type")(types)(type);
		const sort_type = await get_safe_config_elem("Sort")(sorts)(sort);

		const query = get_list_queries.query[query_type];
		const sort_obj = get_list_queries.sort[sort_type];

		const articles = await list_articles(query)(sort_obj)(n);
		assert(articles.length !== 0, "Nothing to review!");

		const width = process.stdout.columns;
		const headers_widths = get_headers_widths(width, config);

		draw_table_head(width, headers_widths);
		display_table_items(width, headers_widths, articles);

		await db.close();
		console.timeEnd("Finished in");
	} catch (e) {
		console.log(e.message);
		await db.close();
		process.exit(1);
	}
};
