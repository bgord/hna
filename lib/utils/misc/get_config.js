const yaml = require("js-yaml");
const fs = require("fs");

module.exports = () =>
	yaml.safeLoad(fs.readFileSync(`${BASE_PATH}/config.yml`, "utf8"));
