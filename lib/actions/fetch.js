const assert = require("assert");

const { get_safe_number, get_safe_source } = require("../utils/validators");
const api_communicator = require("../utils/comunicators");

module.exports = config => async (number, { source }) => {
	try {
		const src = await get_safe_source(config)(source);
		const n = await get_safe_number(config.sources[src])(number);

		const articles = await api_communicator[src](config)(n);
		console.log(articles);
	} catch (e) {
		console.log(e.message);
		process.exit(1);
	}
};
