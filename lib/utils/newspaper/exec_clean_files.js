const { promisify } = require("util");
const { unlink, readdir } = require("fs");
const get_files = promisify(readdir);
const delete_file = promisify(unlink);
const path = require("path");

const flatten_arr = arr => [].concat(...arr);

module.exports = () => {
	const directories = [`${BASE_PATH}/tmp_files`, `${BASE_PATH}/newspapers`];
	const extensions_to_delete = [".epub", ".mobi", ".html", ".txt"];
	return Promise.all(
		directories.map(dir =>
			get_files(dir).then(files => files.map(file => `${dir}/${file}`))
		)
	)
		.then(arr =>
			flatten_arr(arr).filter(
				file => extensions_to_delete.indexOf(path.extname(file)) !== -1
			)
		)

		.then(files => {
			console.log(files);
			return files;
		})
		.then(files => files.forEach(file_dir => delete_file(file_dir)));
};
