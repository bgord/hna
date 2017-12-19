const { promisify } = require("util");
const { unlink, readdir } = require("fs");
const get_files = promisify(readdir);
const delete_file = promisify(unlink);

const flatten_arr = arr => [].concat(...arr);

(async () => {
	try {
		const directories = ["./tmp_files", "./newspapers"];
		const extensions_to_delete = ["epub", "mobi", "html", "txt"];
		const files_to_delete = await Promise.all(
			directories.map(dir =>
				get_files(dir).then(files =>
					files.map(file => `${dir}/${file}`)
				)
			)
		).then(arr =>
			flatten_arr(arr).filter(file => {
				const extension = file.split(".")[2];
				return extensions_to_delete.indexOf(extension) !== -1;
			})
		);
		console.log(files_to_delete);
		files_to_delete.forEach(file_dir => delete_file(file_dir));
	} catch (e) {
		console.log(e.message);
	}
})();
