const { writeFile } = require("fs");
const { promisify } = require("util");
const write = promisify(writeFile);

module.exports = title => {
	const start = get_start(title);
	return write(`${BASE_PATH}/tmp_files/start.html`, start);
};

function get_start(title) {
	return `
    <!doctype html>
    <head>
        <meta charset='utf-8'>
        <title>
           ${title}
        </title>
    </head>
    <body>`;
}
