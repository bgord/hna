const assert = require("assert");

module.exports = ({ min_articles, max_articles }) => number =>
	new Promise((resolve, reject) => {
		const n = +number;

		const nan_err = "Please, type a number of articles to fetch";
		assert(isNaN(n) === false, nan_err);

		const gt_err = `Given number is greater than ${max_articles}`;
		assert(n <= max_articles, gt_err);

		const lt_err = `Given number is lower than ${min_articles}`;
		assert(n >= min_articles, lt_err);

		resolve(n);
	});
