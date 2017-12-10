const assert = require("assert");

const { get_safe_number, get_safe_source } = require("../utils");
const { get } = require("axios");

module.exports = config => async (number, { source }) => {
	try {
		const src = await get_safe_source(config)(source);
		const n = await get_safe_number(config.sources[src])(number);
		console.log(n, src);
	} catch (e) {
		console.log(e.message);
		process.exit(1);
	}
};
