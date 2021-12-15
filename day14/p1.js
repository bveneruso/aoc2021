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

let applyInsertRules = function(inputString, rules) {
	let outputString = '';
	for(let i = 0; i < inputString.length - 1; i++) {
		outputString +=  inputString.charAt(i);
		let pair = inputString.substr(i, 2);
		if(rules.hasOwnProperty(pair)) {
			outputString += rules[pair];
		}
	}
	outputString += inputString.charAt(inputString.length - 1);
	//console.log(inputString + ' becomes ' + outputString);
	return outputString;
}

let getScore = function(inputString) {
	let countOfEachLetter = {};
	for(let char of inputString.split('')) {
		if(!countOfEachLetter.hasOwnProperty(char))
			countOfEachLetter[char] = 0;
		countOfEachLetter[char]++;
	}
	let countArray = [];
	for(let key of Object.keys(countOfEachLetter)) {
		countArray.push({letter: key, count: countOfEachLetter[key]});
	}
	countArray = countArray.sort((objA, objB) => objA.count - objB.count);
	return countArray;
}

let run = async function() {
	let input = await util.readFile(`${__dirname}/p1input.txt`);
	let rules = buildInsertRules(input);
	let inputString = input[0].trim();
	for(let i = 0; i < 10; i++) {
		inputString = applyInsertRules(inputString, rules);
	}
	let score = getScore(inputString)
	console.log(score);
	return score[score.length - 1].count - score[0].count;
}

module.exports = {
	run
}


