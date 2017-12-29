module.exports = (arr, status) =>
	arr.reduce((acc, curr) => {
		acc[curr.id] = { status };
		return acc;
	}, {});
