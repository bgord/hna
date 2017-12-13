const assert = require("assert");
const l = console.log;

const { get_safe_number, get_safe_source } = require("../utils/validators");
const api_communicator = require("../utils/comunicators");
const { insert_articles } = require("../utils/db");
const { print_inserted_count } = require("../utils/misc");

module.exports = config => db => async (number, { source }) => {
	try {
		const src = await get_safe_source(config)(source);
		const n = await get_safe_number(config.sources[src])(number);

		l(`Trying to fetch ${n} articles from ${src}...`);

		const articles = await api_communicator[src](config)(n);
		const inserted = await insert_articles(articles);
		print_inserted_count(n, articles.length, inserted);
		await db.close();
	} catch (e) {
		console.log(e.message);
		await db.close();
		process.exit(1);
	}
};
