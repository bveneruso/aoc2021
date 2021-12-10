const util = require('../helpers/util.js');

const UNIQUE_DIGIT_MAP = {
	2: 1,
	4: 4,
	3: 7,
	7: 8
}

const SEGMENTS_FOUR_NUMBER_MAP = {
	0: 'abcefg', // 6 segments
	1: 'cf', // 2 segments (UNIQUE)
	2: 'acdeg', // 5 segments
	3: 'acdfg', // 5 segments
	4: 'bcdf', // 4 segments (UNIQUE)
	5: 'abdfg', // 5 segments
	6: 'abdefg', // 6 segments
	7: 'acf', // 3 segments (UNIQUE)
	8: 'abcdefg', // 7 segments (UNIQUE)
	9: 'abcdfg' // 6 segments
}

// 6 segment options: 0,6,9
// 5 segment options: 2,3,5

let processExampleSignals = function(line) {
	let [examples, output] = line.split('|');
	let outputDigits = output.trim().split(' ');
	let examplePatterns = examples.trim().split(' ');
	let sumOfEasyNumbers = 0;
	outputDigits.forEach(digitString => {
		if(UNIQUE_DIGIT_MAP.hasOwnProperty(digitString.length))
			sumOfEasyNumbers++;
	});
	return sumOfEasyNumbers;
}

let run = async function() {
	let input = await util.readFile(`${__dirname}/p1input.txt`);
	let sumOfEasyNumbers = 0;
	input.forEach(line => {
		if(line.trim().length > 0)
			sumOfEasyNumbers += processExampleSignals(line)
	});
	return sumOfEasyNumbers;
}

module.exports = {
	run
}


