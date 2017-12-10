const assert = require("assert");
const get_first_n = require("./get_first_n");

describe("get_first_n", () => {
	const given = [1, 2, 3, 4, 5];
	it("should return first n elements of arr", () => {
		const expected = [1, 2, 3];
		const n = 3;

		const outcome = get_first_n(n)(given);
		assert.deepEqual(expected, outcome);
	});
	it("should throw an error when n is NaN", () => {
		assert.throws(() => {
			const n = "abc";
			const outcome = get_first_n(n)(given);
		});
	});
	it("should return an empty array when n is zero", () => {
		const n = 0;
		const expected = [];

		const outcome = get_first_n(n)(expected);
		assert.deepEqual(outcome, expected);
	});
	it("should throw an error when arr argument is not an array", () => {
		assert.throws(() => {
			const invalid_arr = {};
			const n = 3;
			const outcome = get_first_n(n)(invalid_arr);
		});
	});
});
