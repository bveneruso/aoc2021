const util = require('../helpers/util.js');

const SEGMENT_LABELS = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

const SEGMENTS_FOR_NUMBER_MAP = {
	0: new Set('abcefg'.split('')), // 6 segments
	1: new Set('cf'.split('')), // 2 segments (UNIQUE)
	2: new Set('acdeg'.split('')), // 5 segments
	3: new Set('acdfg'.split('')), // 5 segments
	4: new Set('bcdf'.split('')), // 4 segments (UNIQUE)
	5: new Set('abdfg'.split('')), // 5 segments
	6: new Set('abdefg'.split('')), // 6 segments
	7: new Set('acf'.split('')), // 3 segments (UNIQUE)
	8: new Set('abcdefg'.split('')), // 7 segments (UNIQUE)
	9: new Set('abcdfg'.split('')) // 6 segments
}

const POSSIBLE_NUMBERS_FOR_SEGMENT_LENGTH = {
	2: [1], // Has to be a 1
	4: [4], // Has to be a 4
	3: [7], // Has to be a 7
	7: [8], // Has to be an 8
	5: [2, 3, 5], // could be a 2, 3, or 5
	6: [0, 6, 9] // could be a 0, 6, or 9
}

const UNIQUE_DIGIT_MAP = {
	2: SEGMENTS_FOR_NUMBER_MAP[1],
	4: SEGMENTS_FOR_NUMBER_MAP[4],
	3: SEGMENTS_FOR_NUMBER_MAP[7]
}

let processExampleSignals = function(line) {

	let [examples, output] = line.split('|');
	let outputDigits = output.trim().split(' ');
	let examplePatterns = examples.trim().split(' ');

	let possibleSegmentMappings = {
		a: new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g']),
		b: new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g']),
		c: new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g']),
		d: new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g']),
		e: new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g']),
		f: new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g']),
		g: new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g']),
	};

	// Pass 1: Identify unique numbers based on length. If an example has a unique length, we know each of the segments in that example
	//	could only possible map to segments in that unique number (perform an intersection).
	//	We know every other segment not present in our example segment can't map to the segments in our unique number (perform a subtraction)
	examplePatterns.forEach(digitString => {
		if(UNIQUE_DIGIT_MAP.hasOwnProperty(digitString.length)) {
			SEGMENT_LABELS.forEach(segment => {
				if(digitString.indexOf(segment) !== -1) {
					possibleSegmentMappings[segment] = util.intersection(possibleSegmentMappings[segment], UNIQUE_DIGIT_MAP[digitString.length]);
				} else {
					possibleSegmentMappings[segment] = util.subtractSet(possibleSegmentMappings[segment], UNIQUE_DIGIT_MAP[digitString.length]);
				}
			})
		}
	});

	// Pass 2: Generate possible segment combinations for each example input based on mappings,
	//   compare to the segment combos that could be possible based on the number of segments,
	//	 intersect possible mappings with all segments that show up in any matching numbers
	examplePatterns.forEach(digitString => {
		let possibleNumbersDueToLength = [...POSSIBLE_NUMBERS_FOR_SEGMENT_LENGTH[digitString.length]];

		let validCombinations = generatePossibleCombinations(possibleSegmentMappings, digitString.split(''));
		validCombinations = validCombinations.map(combo => combo.split('').sort().join(''));
		let stillValidCombos = [];
		let possibleSegments = new Set();
		possibleNumbersDueToLength.forEach(numb => {
			let numberString = [...SEGMENTS_FOR_NUMBER_MAP[numb]].sort().join('');
			if(validCombinations.indexOf(numberString) !== -1) {
				stillValidCombos.push(numberString);
				numberString.split('').forEach(x => possibleSegments.add(x));
			}
		});

		digitString.split('').forEach(x => {
			possibleSegmentMappings[x] = util.intersection(possibleSegmentMappings[x], possibleSegments);
		});
	});

	// Pass 3: Make sure any 1:1 mapped segment doesn't show up in any 1:2 mapping
	SEGMENT_LABELS.forEach(segment => {
		if(possibleSegmentMappings[segment].size === 1) {
			SEGMENT_LABELS.forEach(excludeSegment => {
				if(segment !== excludeSegment) {
					possibleSegmentMappings[excludeSegment].delete([...possibleSegmentMappings[segment]][0]);
				}
			});
		}
	});

	// Use the map to build the actual output
	let outputDecimalString = '';
	outputDigits.forEach(outputDigit => {
		let litSegments = '';
		outputDigit.split('').forEach(segment => {
			litSegments += [...possibleSegmentMappings[segment]][0];
		});
		litSegments = litSegments.split('').sort().join('');
		Object.keys(SEGMENTS_FOR_NUMBER_MAP).forEach(number => {
			if(litSegments === [...SEGMENTS_FOR_NUMBER_MAP[number]].sort().join('')) {
				outputDecimalString += number;
			}
		});
	});

	return Number(outputDecimalString);
}

// Recursively generate all possible combinations that can be made from the remainingSegments based on the possibleSegmentMappings
let generatePossibleCombinations = function(possibleSegmentMappings, remainingSegments) {

	// base case, if only one segment, only combinations are its options
	if(remainingSegments.length === 1) {
		return [...possibleSegmentMappings[remainingSegments[0]]];
	}

	let combinations = [];
	possibleSegmentMappings[remainingSegments[0]].forEach(possibleSegment => {
		let kidOptions = generatePossibleCombinations(possibleSegmentMappings, remainingSegments.slice(1));
		kidOptions.forEach(kidOption => {
			combinations.push(possibleSegment + kidOption);
		});
	});

	// Remove any combination that has the same letter twice
	combinations = combinations.filter(combo => {
		let uniqueLetterSet = new Set();
		for(let letter of combo.split('')) {
			if(!uniqueLetterSet.has(letter)) {
				uniqueLetterSet.add(letter)
			} else {
				return false;
			}
		}
		return true;
	});

	return combinations;
}

let run = async function() {
	let input = await util.readFile(`${__dirname}/p2input.txt`);
	let sumOfOutputNumbers = 0;
	input.forEach(line => {
		if(line.trim().length > 0)
			sumOfOutputNumbers += processExampleSignals(line)
	});
	return sumOfOutputNumbers;
}

module.exports = {
	run
}


