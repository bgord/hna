const assert = require("assert");
const old_to_new = {
	unreviewed: ["interesting", "boring"],
	interesting: ["sent", "boring"],
	boring: [],
	sent: [],
};

module.exports = ({ status: old_status }, new_status) =>
	new Promise((resolve, reject) => {
		assert(
			Object.keys(old_to_new).includes(old_status),
			`Unknown old_status: ${old_status}`
		);

		assert(
			Object.keys(old_to_new).includes(new_status),
			`Unknown new_status: ${new_status}`
		);

		return old_to_new[old_status].includes(new_status)
			? resolve(true)
			: reject(
					`You cannot transition from ${old_status} to ${new_status}`
				);
	});
