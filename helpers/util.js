const lineReader = require('line-reader');

/**
 * @param fileName The file to read, often in the format `${__dirname}/p1input.txt`
 * @param callback The callback to run for each line
 * @returns {Promise<unknown>} Resolves when all lines are read
 */
let readFile = async function(fileName, callback) {
	return new Promise(function(resolve, reject) {
		lineReader.eachLine(fileName, function(line) {
			if(line.trim().length > 0)
				callback(line.trim());
		}, function(err) {
			if(err)
				reject(err);
			resolve();
		});
	});
}

module.exports = {
	readFile
}
