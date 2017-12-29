const l = console.log;
const assert = require("assert");
const { get_safe_number } = require("../utils/validators");
const { retrieve_articles, update_status } = require("../utils/db");
const {
	get_articles_content,
	articles_to_file,
	create_nav,
	combine_files,
	create_newspaper_header,
	generate_title,
	format_to_mobi,
	send_email,
	create_links_file,
	newspaper_to_zip,
	create_newspaper_entry,
	get_newspapers_count,
	exec_clean_files,
} = require("../utils/newspaper");
const { to_lookup_table } = require("../utils/misc");

module.exports = config => db => async number => {
	try {
		console.time("Finished in");
		const { min_articles, max_articles, chars_per_second } = config.push;
		const nodemailer_config = config.nodemailer;
		const kindle_email = config.kindle_email;
		const limit = await get_safe_number({ min_articles, max_articles })(
			number
		);

		l(`Trying to find ${limit} articles...`);
		const articles = await retrieve_articles({
			query: { status: "interesting" },
			project: { url: 1, title: 1 },
			limit,
			sort: {},
		}).then(articles =>
			articles.map(({ _id, title, url }) => ({
				id: _id,
				title,
				url,
			}))
		);

		const lookup_table = to_lookup_table(articles, "sent");

		l(`Found ${articles.length} articles.`);
		assert(articles.length > 0, "There are no articles to push");
		const articles_contents = await get_articles_content(articles);
		await create_nav(articles_contents, chars_per_second);
		await articles_to_file(articles_contents);
		const newspapers_count = (await get_newspapers_count()) + 1;
		l(`It is going to be your newspaper #${newspapers_count}`);
		const title = generate_title(newspapers_count);
		await create_links_file(articles_contents, title);
		await create_newspaper_header(title);
		l("Combining files...");
		combine_files(articles_contents, title);
		l(`Formatting to mobi...`);
		format_to_mobi(title);
		l(`Sending email...`);
		await send_email(nodemailer_config, kindle_email, title);
		l("Creating zip file...");
		await newspaper_to_zip(title);
		l("Marking articles as read...");
		await update_status(lookup_table);
		l("Saving newspaper's info to db...");
		await create_newspaper_entry(title, articles_contents);
		l("Cleaning files...");
		await exec_clean_files();
		await db.close();
		console.timeEnd("Finished in");
	} catch (e) {
		console.log(e);
		await db.close();
		process.exit(1);
	}
};
