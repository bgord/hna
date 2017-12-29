module.exports = objs =>
	objs.map((obj, i) => Object.assign(obj, { count: i + 1 }));
