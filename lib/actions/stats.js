const { retrieve_articles, get_newspapers_with_links } = require("../utils/db");
const { bold } = require("chalk");

const new_line = () => console.log("\n");

const {
	print_most_popular_title_words,
	print_status_counts,
} = require("../utils/misc");

module.exports = config => db => async () => {
	const articles = await retrieve_articles({
		query: {},
		project: {},
		limit: null,
		sort: {},
	});
	const newspapers = await get_newspapers_with_links({
		query: {},
		project: { _id: 0, title: 1, kids: 1 },
		limit: 10,
		sort: { created_at: -1 },
	});

	console.log(
		newspapers.forEach(({ title, links }, i) => {
			console.log(`${i + 1}) ${bold(title)}\n`);
			console.log(
				`${links
					.map(({ title, url }) => `\t- ${title}\n\t\t+ ${url}\n\n`)
					.join("")}`
			);
		})
	);
	new_line();

	print_status_counts(articles, "interesting");
	print_status_counts(articles, "unreviewed");
	print_status_counts(articles, "boring");
	print_status_counts(articles, "sent");
	print_status_counts(articles, "all");
	new_line();
	print_most_popular_title_words(articles);
	new_line();
};
