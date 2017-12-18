const l = console.log;
const { get_safe_number } = require("../utils/validators");
const { get_articles_to_push } = require("../utils/db");
const { get_articles_content } = require("../utils/newspaper");

module.exports = config => db => async number => {
	try {
		console.time("Finished in");
		const { min_articles, max_articles } = config.push;
		const n = await get_safe_number({ min_articles, max_articles })(number);
		const articles = await get_articles_to_push(n);
		const articles_contents = await get_articles_content(articles);

		await db.close();
		console.timeEnd("Finished in");
	} catch (e) {
		console.log(e.message);
		await db.close();
		process.exit(1);
	}
};
