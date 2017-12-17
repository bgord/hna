module.exports = n => char => {
	let str = "";
	for (let i = 0; i < n; i++) {
		str += char;
	}
	return str;
};
