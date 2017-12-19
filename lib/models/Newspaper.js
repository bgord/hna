const mongoose = require("mongoose");

const newspaper_schema = mongoose.Schema({
	title: { type: String, required: true },
	created_at: { type: Date, required: true, default: Date.now() },
	kids: { type: Array },
});

newspaper_schema.index({ title: 1 }, { unique: true });

module.exports = Newspaper = mongoose.model("newspapers", newspaper_schema);
