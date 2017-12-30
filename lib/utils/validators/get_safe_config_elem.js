const assert = require("assert");

module.exports = type => sources => resource =>
	new Promise((resolve, reject) => {
		assert(
			sources.includes(resource),
			`${type}: ${resource} is not defined in config.yml`
		);
		resolve(resource);
	});
