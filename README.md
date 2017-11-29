# hna
Hacker news aggregator.


### Setup

In order to run mongodb locally on boot, create bash script named `run_mongodb_locally.sh` with following content.

    #!/usr/bin/env bash

    nohup mongod --port 27000 &

Make it executable.

> $ chmod u+x /path/to/run_mongodb_locally.sh

Edit crontab file.

> $ crontab -e

Append line:

`@reboot  /path/to/run_mongodb_locally.sh`

[**Source**](https://stackoverflow.com/a/40529334)
