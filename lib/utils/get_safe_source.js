const assert = require("assert");

module.exports = ({ sources }) => source =>
	new Promise((resolve, reject) => {
		const src_err = `Source: ${source} is not defined in config.yml`;
		assert(Object.keys(sources).indexOf(source) !== -1, src_err);

		resolve(source);
	});
