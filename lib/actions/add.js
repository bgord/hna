const l = console.log;
const assert = require("assert");
const is_url = require("is-url");
const { insert_articles } = require("../utils/db");
const { print_inserted_count } = require("../utils/misc");

module.exports = config => db => async ({ title, url }) => {
	try {
		console.time("Finished in");

		assert.notEqual(title, undefined, "Title is requried");
		assert.notEqual(url, undefined, "URL is required");
		assert.notEqual(is_url(url), false, "Invalid URL");

		l(`Trying to insert one given article...`);

		const article = [{ url, title, source: "single" }];
		const inserted = await insert_articles(article);

		print_inserted_count(1, 1, inserted);

		await db.close();
		console.timeEnd("Finished in");
	} catch (e) {
		console.log(e.message);
		await db.close();
		process.exit(1);
	}
};
