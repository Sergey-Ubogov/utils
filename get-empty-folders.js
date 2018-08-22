let fs = require('fs');
let path = require('path');
 
if (process.argv.length <= 2) {
    console.log("arg: full path dir for recursive check for empty folders");
    process.exit(-1);
}
 
var fullpath = process.argv[2];

function dirIsEmpty(files) {
	return !files.length;
}

const getAllEmptyDirs = dir => {
	let files = fs.readdirSync(dir);
	if (dirIsEmpty(files)) return dir;

	let folders = files.filter(file => {
		if (!~file.indexOf('tmp') || !~file.indexOf('node_modules')) return false;
		try {
			return fs.statSync(path.join(dir, file)).isDirectory()
		} catch(e) {
			return false;
		}
	});
	return folders.reduce((emptyFolders, dirName) =>
		emptyFolders.concat(getAllEmptyDirs(path.join(dir, dirName))), []);
}

const emptyFolders = getAllEmptyDirs(fullpath);
if (emptyFolders.length) {
	console.info('Current folders is empty:');
	getAllEmptyDirs(fullpath).forEach((dir, index) => console.info(`${index+1}. ${dir}`))
} else {
	console.info('empty folders not found, good job! :)');
}