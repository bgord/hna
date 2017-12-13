#!/usr/bin/env node

const program = require("commander");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
require("http").globalAgent.maxSockets = 501;
const { start_db } = require("./lib/utils/db");

const { fetch } = require("./lib/actions");
const { get_config } = require("./lib/utils/misc");
const config = get_config();

const db = start_db();
program
	.command("fetch <number>")
	.alias("f")
	.description(
		"Fetch specified number or top articles from from given source"
	)
	.option(
		"-s, --source <source>",
		"Which source to fetch from",
		config.default_source
	)
	.action(fetch(db));

program.parse(process.argv);