let fs = require('fs');
let path = require('path');
 
if (process.argv.length <= 2) {
    console.log("arg: full path dir for rename *.js(x) to *.ts(x)");
    process.exit(-1);
}
 
var fullpath = process.argv[2];
 
const getAllFiles = dir =>
  fs.readdirSync(dir).reduce((files, file) => {
    const name = path.join(dir, file);
    const isDirectory = fs.statSync(name).isDirectory();
    return isDirectory ? [...files, ...getAllFiles(name)] : [...files, name];
  }, []);
  
getAllFiles(fullpath).forEach(file => {
    let arr = file.split('.');
    if (file.indexOf('node_modules') !== -1) return;
	let extFile = arr[arr.length - 1]
	let nameFile = arr.slice(0, -1).join('.');
	if (file !== __filename) 
		if (extFile === 'js') fs.renameSync(path.normalize(file), `${nameFile}.ts`);
		else if (extFile === 'jsx') fs.renameSync(path.normalize(file), `${nameFile}.tsx`)
});