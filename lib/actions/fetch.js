const assert = require("assert");
const { get_safe_number, get_safe_source } = require("../utils/validators");
const api_communicator = require("../utils/comunicators");
const { insert_articles } = require("../utils/db");
const { print_inserted_count } = require("../utils/misc");
const { filter_blocked_keywords } = require("../utils/validators");

module.exports = config => db => async (number, { source }) => {
	const src = await get_safe_source(config)(source);
	const n = await get_safe_number(config.sources[src])(number);

	console.log(`Trying to fetch ${n} articles from ${src}...`);
	const articles = await api_communicator.insert[src](config)(n);
	const filtered = articles.filter(filter_blocked_keywords(config));

	assert(filtered.length !== 0, "There are no articles to insert...");

	const inserted = await insert_articles(filtered);
	print_inserted_count(n, articles.length, filtered.length, inserted);

	console.log(`Performing after insert action...`);
	await api_communicator.after_insert[src](config)(articles);
};
