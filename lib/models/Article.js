const mongoose = require("mongoose");

const article_schema = mongoose.Schema({
	title: { type: String, required: true },
	url: { type: String, required: true },
	source: { type: String, required: true },
	//unreviewed, interesting, boring, ready_to_send,sent
	status: { type: String, required: true, default: "unreviewed" },
	inserted_at: { type: Date, required: true, default: Date.now() },
	sent_at: { type: Date },
	kids: { type: Array },
});

article_schema.index({ url: 1 }, { unique: true });

module.exports = Article = mongoose.model("articles", article_schema);
