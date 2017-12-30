const l = console.log;
const assert = require("assert");
const is_url = require("is-url");
const { insert_articles } = require("../utils/db");
const { print_inserted_count } = require("../utils/misc");
const { filter_blocked_keywords } = require("../utils/validators");

module.exports = config => db => async ({ title, url }) => {
	assert.notEqual(title, undefined, "Title is requried");
	assert.notEqual(url, undefined, "URL is required");
	assert.notEqual(is_url(url), false, "Invalid URL");

	l(`Trying to insert one given article...`);

	const article = [{ url, title, source: "single" }];
	const filtered = article.filter(filter_blocked_keywords(config));
	const inserted = await insert_articles(filtered);

	print_inserted_count(1, 1, filtered.length, inserted);
};
