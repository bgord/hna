const get_config = require("../misc/get_config");
const mongoose = require("mongoose");

module.exports = () => {
	const { db_port, db_name } = get_config();
	return mongoose.connect(`mongodb://localhost:${db_port}/${db_name}`, {
		useMongoClient: true,
	});
};
