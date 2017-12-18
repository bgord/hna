const l = console.log;
const { get_safe_number } = require("../utils/validators");
const { get_articles_to_push } = require("../utils/db");
const {
	get_articles_content,
	articles_to_file,
	create_nav,
	combine_files,
	create_newspaper_header,
	generate_title,
} = require("../utils/newspaper");

module.exports = config => db => async number => {
	try {
		console.time("Finished in");
		const { min_articles, max_articles, chars_per_second } = config.push;
		const n = await get_safe_number({ min_articles, max_articles })(number);
		l(`Trying to find ${n} articles...`);
		const articles = await get_articles_to_push(n);
		l(`Found ${articles.length} articles.`);
		const articles_contents = await get_articles_content(articles);
		await create_nav(articles_contents, chars_per_second);
		await articles_to_file(articles_contents);
		const title = generate_title();
		await create_newspaper_header(title);
		combine_files(articles_contents, title);
		await db.close();
		console.timeEnd("Finished in");
	} catch (e) {
		console.log(e.message);
		await db.close();
		process.exit(1);
	}
};
