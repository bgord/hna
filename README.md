# hna

Hacker news aggregator.

## Project description

**hna** is command-line tool to handle news overload problem.

I wrote this project to solve some problems I had with reading news in general

* spending too much time jumping from one article to another, pretending I do
	something that's more important than acutal work I have to do
* reading from screen that is not designed to read from for a long time
* compulsively refreshing hacker news _newest_ page on my smartphone

Benefits

* now, I have dedicated time, device and content to read
* I spend less time staring on my laptop/smartphone screen
* I decreased my daily phone usage
* as English is my second language, I have an opportunity to increase my
	knowledge using Kindle's built-in _vocabulary builder_ and _flashcards_
	application

## Project workflow

1. Fetching specified number of articles from hacker news or adding individual
	article's url and title. They're stored in db.
2. Reviewing articles. Mark given article as interesting or not.
3. Sending newspaper.mobi to Kindle.

	Additional features

	* listing articles you marked as interesting
	* displaying statistics (articles/day, most frequent words in titles etc.)

## Requirements

This project assumes you have Kindle.

You must also have
[mongodb](https://www.mongodb.com/download-center?jmp=tutorials#community),
[node](https://nodejs.org/en/), [pandoc](http://pandoc.org/installing.html) and
[calibre](https://calibre-ebook.com/download) installed on your Linux machine.

Generally this code can also work on Windows with some changes applied (this
topic will be mentioned later).

### Setup

#### Mongod

Create bash script named `run_mongodb_locally.sh` with following content.
Whenewer your machine reboots, mongo daemon will start running in background
automatically, so you won't have to type in manually everytime.

    #!/usr/bin/env bash

	nohup mongod --port 27000 &

Make script executable.

    $ chmod u+x /path/to/run_mongodb_locally.sh

Edit crontab file.

    $ crontab -e

Append line:

`@reboot /path/to/run_mongodb_locally.sh`

#### Make `hna` command global

At first, everytime you would like to run the application, you have to `cd` to
the project directory and type `node index <command>`. That's inconvinient. In
this part we will work out our way to run `hna` command from wherever you want.

We should start with initializing npm project and creating index.js file.

    $ npm init -y

	$ touch index.js

In index.js file write following. First line sets node as script interpreter. It
saves some time before execution, normally spent to figure out a language the
script is written in.

    #!/usr/bin/env node

	console.log("Hello, hna!");

Now, append this code to generated package.json file.

    "bin": {
	    "hna": "index.js"
	}

Install your package globally. If there's permisson error - run with sudo.

    $ npm i -g

And now, voila! `hna` command is available and prints some very nice message.
