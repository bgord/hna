const moment = require("moment");

module.exports = n => `raok #${n} ${moment().format("DD-MM-YYYY")}`;
