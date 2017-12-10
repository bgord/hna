const { get_config } = require("../utils/misc");

const config = get_config();

const add_config = config => fn => fn(config);

const with_config = obj => {
	Object.keys(obj).forEach(dep => {
		obj[dep] = add_config(config)(obj[dep]);
	});
	return obj;
};

module.exports = with_config({
	fetch: require("./fetch"),
});
