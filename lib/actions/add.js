const l = console.log;
const assert = require("assert");
const { insert_articles } = require("../utils/db");
const { print_inserted_count } = require("../utils/misc");

module.exports = config => db => async ({ title, url }) => {
	try {
		console.time("Finished in");

		assert.notEqual(title, undefined, "Title is requried");
		assert.notEqual(url, undefined, "URL is required");

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
