const util = require('../helpers/util.js');


const CLOSING_VALUES = {
	')': 1,
	'}': 3,
	']': 2,
	'>': 4
}

const CHUNK_PAIRS = {
	'(': ')',
	'{': '}',
	'[': ']',
	'<': '>'
}

// returns invalid terminator for line if present, otherwise empty string
let getCompletionString = function(line) {
	let completionString = [];
	let chunkStack = [];
	for(let char of line.split('')) {
		if(Object.keys(CHUNK_PAIRS).indexOf(char) !== -1) {
			chunkStack.push(char);
		} else {
			if(chunkStack.length === 0)
				return completionString;
			let expectedOpener = chunkStack.pop();
			let expectedCloser = CHUNK_PAIRS[expectedOpener];
			if(expectedCloser !== char) {
				return completionString;
			}
		}
	}
	while(chunkStack.length > 0) {
		let opener = chunkStack.pop();
		completionString.push(CHUNK_PAIRS[opener]);
	}
	return completionString;
}

let run = async function() {
	let input = await util.readFile(`${__dirname}/p2input.txt`);
	let scores = [];
	input.forEach(line => {
		let completionStringArray = getCompletionString(line);
		let score = 0;
		if(completionStringArray.length > 0) {
			console.log(line + ' has completion ' + completionStringArray.join(''));
			completionStringArray.forEach(char => {
				score *= 5;
				score += CLOSING_VALUES[char];
			});
			scores.push(score);
		}
	});

	scores.sort((x,y) => x - y);
	return scores[Math.round(scores.length / 2) - 1];
}

module.exports = {
	run
}


