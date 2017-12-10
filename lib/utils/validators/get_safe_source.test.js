const assert = require("assert");
const get_safe_source = require("./get_safe_source");

const config = {
	sources: {
		hn: {},
		pocket: {},
	},
};

describe("get_safe_source", () => {
	it("should return the source if given source exists in config.yml", () =>
		get_safe_source(config)("hn").then(src => assert.equal(src, "hn")));
	it("should throw an error if given source doesn't exists in config.yml", () =>
		get_safe_source(config)("feedly").catch(err =>
			assert.equal(
				err.message,
				`Source: feedly is not defined in config.yml`
			)
		));
});
