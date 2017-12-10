const assert = require("assert");
const get_safe_number = require("./get_safe_number");

const config = {
	min_articles: 1,
	max_articles: 500,
};

describe("get_safe_number", () => {
	it("should throw an error when given a NaN", () =>
		get_safe_number(config)("abc").catch(e =>
			assert.equal(
				e.message,
				"Please, type a number of articles to fetch"
			)
		));
	it("should return proper value when given a string number", () =>
		get_safe_number(config)("2").then(number => assert.equal(2, 2)));
	it("should return proper value when given a number", () =>
		get_safe_number(config)(2).then(number => assert.equal(2, 2)));
	it("should throw an error when given number is greater than max_articles", () =>
		get_safe_number(config)(501).catch(e =>
			assert.equal(
				e.message,
				`Given number is greater than ${config.max_articles}`
			)
		));
	it("should throw an error when given number is lower than min_articles", () =>
		get_safe_number(config)(0).catch(e =>
			assert.equal(
				e.message,
				`Given number is lower than ${config.min_articles}`
			)
		));
});
