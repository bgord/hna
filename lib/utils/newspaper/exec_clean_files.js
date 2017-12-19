const { execSync } = require("child_process");

module.exports = () => {
	return execSync(`node clean_tmp_files`);
};
