const l = console.log;

module.exports = (requested, received, after_filter, after_insert) => {
	const inserted =
		Array.isArray(after_insert) && after_filter !== 0
			? `all of them`
			: after_filter === 0 ? 0 : after_filter - after_insert;
	l(`Requested for: ${requested}.`);
	l(`Received: ${received}.`);
	l(`After filter: ${after_filter}`);
	l(`Inserted: ${inserted}.`);
};
