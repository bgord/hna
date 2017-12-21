const l = console.log;
const assert = require("assert");
const {
	get_safe_number,
	get_safe_config_elem,
} = require("../utils/validators");
const {
	get_review_query,
	get_articles_to_review,
	update_after_review,
} = require("../utils/db");
const inquirer = require("inquirer");
const { article_to_question, answer_stats } = require("../utils/misc");

module.exports = config => db => async (number, { type }) => {
	try {
		console.time("Finished in");
		const { min_articles, max_articles, types } = config.review;
		const n = await get_safe_number({ min_articles, max_articles })(number);
		const query_type = await get_safe_config_elem("Type")(types)(type);
		l(`Trying to retrieve ${n} articles...`);
		const search_query = get_review_query[query_type];
		const articles = await get_articles_to_review(search_query)(n);
		assert(articles.length !== 0, "No articles to review");
		l(`Found ${articles.length} articles.\n`);
		l(
			`You can press Ctrl + C if you want to stop. Articles won't be updated unless you finish whole review.`
		);
		const questions = articles.map(article_to_question);
		const answers = await inquirer.prompt(questions);
		answer_stats(answers);
		l(`Updating is_interesting field of reviewed articles...`);
		await update_after_review(answers);
		l("Updated!");
		await db.close();
		console.timeEnd("Finished in");
	} catch (e) {
		console.log(e.message);
		await db.close();
		process.exit(1);
	}
};
