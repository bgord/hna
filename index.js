#!/usr/bin/env node

global.BASE_PATH = __dirname;

const program = require("commander");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
require("http").globalAgent.maxSockets = 501;
const { start_db } = require("./lib/utils/db");

const { fetch, add, review, list, push, stats } = require("./lib/actions");
const { get_config } = require("./lib/utils/misc");
const config = get_config();

const db = start_db();

const with_err_handling = func =>
	async function(...args) {
		try {
			console.time("Finished in");
			await func(...args);
			await db.close();
			console.timeEnd("Finished in");
		} catch (e) {
			console.log(e.message);
			await db.close();
			process.exit(1);
		}
	};

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
	.action(with_err_handling(fetch(db)));

program
	.command("add")
	.alias("a")
	.description("Add single article, preferably outside of defined sources")
	.option("-t, --title <title>", "Title of the article")
	.option("-u, --url <url>", "URL of the article")
	.action(with_err_handling(add(db)));

program
	.command("review <number>")
	.alias("r")
	.description("Match articles as interesting or not")
	.option(
		"-q, --query <query>",
		"Type of articles to review",
		config.review.default_query
	)
	.action(with_err_handling(review(db)));

program
	.command("list <number>")
	.alias("l")
	.description("List articles basing on given query")
	.option(
		"-q, --query <query>",
		"Match articles only with given query",
		config.list.default_query
	)
	.action(with_err_handling(list(db)));

program
	.command("push <number>")
	.alias("p")
	.description("Send article to your Kindle device")
	.action(with_err_handling(push(db)));

program
	.command("stats")
	.alias("s")
	.description("Display stats about your use of raok")
	.action(with_err_handling(stats(db)));

program.parse(process.argv);
