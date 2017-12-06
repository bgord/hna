# hna
Hacker news aggregator.

### Requirements

This project assumes you have Kindle.

You must also have [mongoodb](https://www.mongodb.com/download-center?jmp=tutorials#community), [node](https://nodejs.org/en/), [pandoc](http://pandoc.org/installing.html) and [calibre](https://calibre-ebook.com/download) installed on your Linux machine. 

Generally this code can also work on Windows with some changes (it'll be mentioned later).

### Setup

In order to run mongodb locally on boot, create bash script named `run_mongodb_locally.sh` with following content.

    #!/usr/bin/env bash

    nohup mongod --port 27000 &

Make it executable.

    $ chmod u+x /path/to/run_mongodb_locally.sh

Edit crontab file.

    $ crontab -e

Append line:

`@reboot  /path/to/run_mongodb_locally.sh`

[**Source**](https://stackoverflow.com/a/40529334)
