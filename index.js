#!/usr/bin/env node

global.BASE_PATH = __dirname;

const program = require("commander");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
require("http").globalAgent.maxSockets = 501;
const { start_db } = require("./lib/utils/db");

const { fetch, add, review, list, push } = require("./lib/actions");
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

program
	.command("add")
	.alias("a")
	.description("Add single article, preferably outside of defined sources")
	.option("-t, --title <title>", "Title of the article")
	.option("-u, --url <url>", "URL of the article")
	.action(add(db));

program
	.command("review <number>")
	.alias("r")
	.description("Match articles as interesting or not")
	.option(
		"-t, --type <type>",
		"Type of articles to review",
		config.review.default_type
	)
	.action(review(db));

program
	.command("list <number>")
	.alias("l")
	.description("List articles basing on given query")
	.option(
		"-q, --query <query>",
		"Match articles only with given query",
		config.list.default_query
	)
	.action(list(db));

program
	.command("push <number>")
	.alias("p")
	.description("Send article to your Kindle device")
	.action(push(db));

program.parse(process.argv);
