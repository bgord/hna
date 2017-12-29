const l = console.log;
const assert = require("assert");
const {
	get_safe_number,
	get_safe_config_elem,
} = require("../utils/validators");
const {
	review_queries,
	retrieve_articles,
	update_status,
} = require("../utils/db");
const inquirer = require("inquirer");
const {
	article_to_question,
	answer_stats,
	add_count_to_objs,
} = require("../utils/misc");

module.exports = config => db => async (number, { query }) => {
	try {
		console.time("Finished in");

		const { min_articles, max_articles, queries } = config.review;
		const limit = await get_safe_number({ min_articles, max_articles })(
			number
		);
		const query_type = await get_safe_config_elem("Query")(queries)(query);
		const query_obj = review_queries[query_type];

		l(`Trying to retrieve ${limit} articles...`);

		const articles = await retrieve_articles({
			query: query_obj,
			project: { url: 1, title: 1, source: 1 },
			limit,
			sort: {},
		}).then(add_count_to_objs);
		assert(articles.length !== 0, "No articles to review");

		l(`Found ${articles.length} articles.\n`);
		l(
			`You can press Ctrl + C if you want to stop. Articles won't be updated unless you finish whole review.`
		);

		const questions = articles.map(article_to_question);
		const answers = await inquirer.prompt(questions);
		answer_stats(answers);

		l(`Updating status of reviewed articles...`);
		await update_status(answers);
		await db.close();
		console.timeEnd("Finished in");
	} catch (e) {
		console.log(e.message);
		await db.close();
		process.exit(1);
	}
};
