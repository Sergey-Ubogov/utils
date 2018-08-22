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

	let folders = files.filter(file => fs.statSync(path.join(dir, file)).isDirectory());
	return folders.reduce((emptyFolders, dirName) =>
		emptyFolders.concat(getAllEmptyDirs(path.join(dir, dirName))), []);
}
console.info('Current folders is empty:');
getAllEmptyDirs(fullpath).forEach((dir, index) => console.info(`${index+1}. ${dir}`))