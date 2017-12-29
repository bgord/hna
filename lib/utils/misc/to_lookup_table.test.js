const to_lookup_table = require("./to_lookup_table");
const assert = require("assert").deepEqual;

describe("to_lookup_table", () => {
	it("works properly", () => {
		const arr = [{ _id: 1, title: "title1" }, { _id: 2, title: "title2" }];
		const expected = { 1: { status: "sent" }, 2: { status: "sent" } };
		const output = to_lookup_table(arr, "sent");
		assert(output, expected);
	});
});
