const stop_words = require("./stop_words");
const { italic } = require("chalk").default;

module.exports = articles => {
	const word_lookup_table = articles
		.filter(
			article =>
				article.status === "sent" || article.status === "interesting"
		)
		.map(article => article.title.toLowerCase())
		.map(title => title.split(" "))
		.reduce((acc, curr) => acc.concat(curr), [])
		.filter(word => !stop_words.includes(word))
		.filter(word => !Number.isInteger(+word))
		.reduce((acc, curr) => {
			if (acc.hasOwnProperty(curr)) acc[curr] = acc[curr] + 1;
			else acc[curr] = 1;

			return {
				...acc,
			};
		}, {});

	const most_popular_words = Object.keys(word_lookup_table)
		.map(word => ({
			word,
			count: word_lookup_table[word],
		}))
		.sort((a, b) => (a.count < b.count ? 1 : a.count > b.count ? -1 : 0))
		.filter((word, index) => index <= 10);

	console.log(
		"Most popular words from titles of articles you find interesting:\n"
	);
	most_popular_words.forEach(({ word, count }) => {
		console.log(`${italic(word)} - ${count}`);
	});
};
