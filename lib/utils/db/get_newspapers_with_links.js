const Newspaper = require("../../models/Newspaper");
const get_articles = require("./retrieve_articles");

module.exports = ({ query, project, limit, sort }) =>
	Newspaper.find(query, project)
		.sort(sort)
		.limit(limit)
		.exec()
		.then(newspapers =>
			Promise.all(
				newspapers.map(async newspaper => ({
					title: newspaper.title,
					links: await Promise.all(
						newspaper.kids.map(kid =>
							get_articles({
								query: { _id: kid },
								project: { _id: 0, title: 1, url: 1 },
							}).then(results => results[0])
						)
					),
				}))
			)
		);
