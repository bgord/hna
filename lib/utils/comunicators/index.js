module.exports = {
	insert: {
		hn: require("./insert_hn"),
		pocket: require("./insert_pocket"),
	},
	after_insert: {
		hn: () => () => {},
		pocket: require("./after_insert_pocket"),
	},
};
