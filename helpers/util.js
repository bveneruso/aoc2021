const lineReader = require('line-reader');

/**
 * @param fileName The file to read, often in the format `${__dirname}/p1input.txt`
 * @param callback The callback to run for each line
 * @returns {Promise<unknown>} Resolves when all lines are read
 */
let readFile = async function(fileName, asNumber = false) {
	return new Promise(function(resolve, reject) {
		let file = [];
		lineReader.eachLine(fileName, function(line) {
			file.push(asNumber ? Number(line.trim()) : line.trim());
		}, function(err) {
			if(err)
				reject(err);
			resolve(file);
		});
	});
}

let range = function(from, to) {
	let arr = [];
	for(let i = from; i <= to; i++) {
		arr.push(i);
	}
	return arr;
}

module.exports = {
	readFile
}
