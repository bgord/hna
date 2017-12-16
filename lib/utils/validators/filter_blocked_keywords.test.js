const { filter_blocked_keywords } = require("./index");
const assert = require("assert");
const blocked_keywords = ["bitcoin", "chrome"];

describe("filter_blocked_keywords", () => {
	it("should let article pass if it doesn't contain any of blocked keywords, and don't let to pass when otherwise", () => {
		const articles = [
			{ title: "Bitcoin hype" },
			{ title: "Chrome doesn't suck" },
			{ title: "Firefox is made great again" },
		];
		const expected = [{ title: "Firefox is made great again" }];
		const output = articles.filter(
			filter_blocked_keywords({ blocked_keywords })
		);
		assert.deepEqual(expected, output);
	});
});
