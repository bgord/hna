module.exports = (arr, status) =>
	arr.reduce((acc, curr) => {
		acc[curr._id] = { status };
		return acc;
	}, {});
