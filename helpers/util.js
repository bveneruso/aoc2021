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

function union(setA, setB) {
	let _union = new Set(setA)
	for (let elem of setB) {
		_union.add(elem)
	}
	return _union
}

function intersection(setA, setB) {
	let _intersection = new Set()
	for (let elem of setB) {
		if (setA.has(elem)) {
			_intersection.add(elem)
		}
	}
	return _intersection
}

function subtractSet(setA, setB) {
	let _difference = new Set(setA)
	for (let elem of setB) {
		_difference.delete(elem)
	}
	return _difference
}

function Set_toJSON(key, value) {
	if (typeof value === 'object' && value instanceof Set) {
		return [...value];
	}
	return value;
}

module.exports = {
	readFile,
	union,
	intersection,
	subtractSet,
	Set_toJSON
}
