const util = require('../helpers/util.js');

let buildInsertRules = function(lineArray) {
	let rules = {};
	for(let line of lineArray) {
		if(line.indexOf('->') !== -1) {
			let [input, output] = line.split(' -> ');
			rules[input] = output;
		}
	}
	return rules;
}

let generatePairCounts = function(inputString) {
	let pairs = {};
	for(let i = 0; i < inputString.length - 1; i++) {
		let pair = inputString.substr(i, 2);
		if(!pairs.hasOwnProperty(pair))
			pairs[pair] = 0;
		pairs[pair]++;
	}
	return pairs;
}

let applyInsertRules = function(pairs, rules) {
	let outputPairs = {};
	for(let pair of Object.keys(pairs)) {
		if(rules.hasOwnProperty(pair)) {
			let insertionChar = rules[pair];
			let resultingPair1 = pair.charAt(0) + insertionChar;
			let resultingPair2 = insertionChar + pair.charAt(1);
			if(!outputPairs.hasOwnProperty(resultingPair1))
				outputPairs[resultingPair1] = 0;
			if(!outputPairs.hasOwnProperty(resultingPair2))
				outputPairs[resultingPair2] = 0;
			outputPairs[resultingPair1] += pairs[pair];
			outputPairs[resultingPair2] += pairs[pair];
		} else {
			if(!outputPairs.hasOwnProperty(pair))
				outputPairs[pair] = 0;
			outputPairs[pair] += pairs[pair];
		}
	}
	return outputPairs;
}

// We need to update this to handle the fact that we're using a pair system
let getScore = function(pairs, firstLetter, lastLetter) {
	let countOfEachLetter = {};

	// every char will be double count, except the 1st and last char are only part of one pair
	for(let pair of Object.keys(pairs)) {
		for(let char of pair.split('')) {
			if(!countOfEachLetter.hasOwnProperty(char))
				countOfEachLetter[char] = 0;
			countOfEachLetter[char] += pairs[pair];
		}
	}

	for(let key of Object.keys(countOfEachLetter)) {
		if(key !== firstLetter && key !== lastLetter) {
			countOfEachLetter[key] /= 2;
		} else {
			countOfEachLetter[key] = (countOfEachLetter[key] - 1) / 2 + 1;
		}
	}

	let countArray = [];
	for(let key of Object.keys(countOfEachLetter)) {
		countArray.push({letter: key, count: countOfEachLetter[key]});
	}
	countArray = countArray.sort((objA, objB) => objA.count - objB.count);
	return countArray;
}

let run = async function() {
	let input = await util.readFile(`${__dirname}/p2input.txt`);
	let rules = buildInsertRules(input);
	let inputString = input[0].trim();
	let pairs = generatePairCounts(inputString);
	for(let i = 0; i < 40; i++) {
		pairs = applyInsertRules(pairs, rules);
	}
	let score = getScore(pairs, inputString.charAt(0), inputString.charAt(inputString.length - 1))
	return score[score.length - 1].count - score[0].count;
}

module.exports = {
	run
}


