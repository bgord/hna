const assert = require("assert");

module.exports = n => arr => {
	const not_arr_err = "The second argument has to be an array";
	assert(Array.isArray(arr), true, not_arr_err);

	const nan_err = "N has to be a number";
	assert(!isNaN(n), true, nan_err);

	return arr.filter((el, ind) => ind < n);
};
