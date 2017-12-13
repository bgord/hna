const mongoose = require("mongoose");

const article_schema = mongoose.Schema({
	title: { type: String, required: true },
	url: { type: String, required: true },
	source: { type: String, required: true },
	is_reviewed: { type: Boolean, required: true, default: false },
	is_interesting: { type: Boolean, required: true, default: false },
	is_sent: { type: Boolean, required: true, default: false },
	inserted_at: { type: Date, required: true, default: Date.now() },
	sent_at: { type: Date },
	kids: { type: Array },
});

article_schema.index({ url: 1 }, { unique: true });

module.exports = Article = mongoose.model("articles", article_schema);
