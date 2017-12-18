const { promisify } = require("util");
const { unlink, readdir } = require("fs");
const get_files = promisify(readdir);
const delete_file = promisify(unlink);

(async () => {
	try {
		const files_to_delete = await get_files("./tmp_files").then(files =>
			files.filter(file => file.includes(".html"))
		);
		console.log(files_to_delete);
		files_to_delete.forEach(file => delete_file(`./tmp_files/${file}`));
	} catch (e) {
		console.log(e.message);
	}
})();
