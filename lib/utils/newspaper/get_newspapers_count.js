const Newspaper = require("../../models/Newspaper");

module.exports = () => Newspaper.find({}).count();
