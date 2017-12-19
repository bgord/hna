const mongoose = require("mongoose");

const newspaper_schema = mongoose.Schema({
	title: { type: String, required: true },
	sent_at: { type: Date },
	articles: { type: Array },
});

newspaper_schema.index1({ title: 1 }, { unique: true });

module.exports = Newspaper = mongoose.model("newspapers", newspaper_schema);
