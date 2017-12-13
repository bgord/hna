const l = console.log;

module.exports = (requested, received, after_insert) => {
	const inserted = Array.isArray(after_insert)
		? "all of them"
		: received - after_insert;
	l(`Requested for: ${requested}.`);
	l(`Received: ${received}.`);
	l(`Inserted: ${inserted}.`);
};
