module.exports = {
	query: {
		interesting: { is_sent: false, is_interesting: true },
		sent: { is_sent: true },
	},
	sort: {
		asc: { inserted_at: 1 },
		desc: { inserted_at: -1 },
	},
};
