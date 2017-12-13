const get_config = require("../misc/get_config");
const mongoose = require("mongoose");

module.exports = () => {
	const { db_port, app_name } = get_config();
	return mongoose.connect(`mongodb://localhost:${db_port}/${app_name}`, {
		useMongoClient: true,
	});
};
