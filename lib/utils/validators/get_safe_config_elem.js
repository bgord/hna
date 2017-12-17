const assert = require("assert");

module.exports = type => sources => resource =>
	new Promise((resolve, reject) => {
		const err = `${type}: ${resource} is not defined in config.yml`;
		assert(sources.indexOf(resource) !== -1, err);
		resolve(resource);
	});
