const axios = require("axios");
const { jsdom } = require("jsdom");
const { Readability } = require("readability-node");
const ProgressBar = require("../misc/ProgressBar");

module.exports = articles => {
	const total = articles.length;
	let current = 0;
	console.log(`Trying to get content of ${total} articles...`);
	ProgressBar.init(total);
	return Promise.all(
		articles.map(async article => {
			return {
				...article,
				content: await axios({
					method: "GET",
					url: article.url,
					headers: { Accept: "text/html" },
				})
					.then(resp => {
						current++;
						ProgressBar.update(current);
						return resp.data;
					})
					.catch(err => {
						current++;
						ProgressBar.update(current);
						return null;
					}),
			};
		})
	).then(articles => {
		const total = articles.length;
		let current = 0;
		console.log(`Processing ${total} articles to cleaner format...`);
		ProgressBar.init(total);
		return articles
			.filter(article => article.content !== null)
			.map(article => {
				const document = jsdom(article.content, {
					features: {
						FetchExternalResources: true,
						ProcessExternalResources: true,
					},
				});
				const file = new Readability(article.url, document).parse();
				current++;
				ProgressBar.update(current);
				return Object.assign({}, file, { id: article.id });
			});
	});
};
