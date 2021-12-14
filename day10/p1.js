const util = require('../helpers/util.js');


const CLOSING_VALUES = {
	')': 3,
	'}': 1197,
	']': 57,
	'>': 25137
}

const CHUNK_PAIRS = {
	'(': ')',
	'{': '}',
	'[': ']',
	'<': '>'
}

// returns invalid terminator for line if present, otherwise empty string
let getInvalidTerminator = function(line) {
	let chunkStack = [];
	for(let char of line.split('')) {
		if(Object.keys(CHUNK_PAIRS).indexOf(char) !== -1) {
			chunkStack.push(char);
		} else {
			if(chunkStack.length === 0)
				return char;
			let expectedOpener = chunkStack.pop();
			let expectedCloser = CHUNK_PAIRS[expectedOpener];
			if(expectedCloser !== char) {
				console.log(line + ' Expected ' + expectedCloser + ' but got ' + char)
				return char;
			}
		}
	}
	return '';
}

let run = async function() {
	let input = await util.readFile(`${__dirname}/p1input.txt`);
	let valueSum = 0;
	input.forEach(line => {
		let invalidTerm = getInvalidTerminator(line);
		if(invalidTerm.length > 0) {
			valueSum += CLOSING_VALUES[invalidTerm];
		}
	});
	return valueSum;
}

module.exports = {
	run
}


