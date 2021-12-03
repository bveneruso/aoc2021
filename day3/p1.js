const util = require('../helpers/util.js');

/**
 * Generates a number with either the most common value for each bit or the least common
 * @param numbers Input array, numbers should be binary strings
 * @param findMostCommonBit True to find most common bits, false to find least common
 * @returns {string} Most or least common combination of bits
 */
let findCommonNumber = function(numbers, findMostCommonBit) {
	let numberOfOnesInIndex = {};

	for(let numb of numbers) {
		let charIndex = 0;
		for(let char of numb.split('')) {
			if(!numberOfOnesInIndex.hasOwnProperty(charIndex))
				numberOfOnesInIndex[charIndex] = 0;
			if(char === '1')
				numberOfOnesInIndex[charIndex]++;
			charIndex++;
		}
	}

	let commonString = Object.values(numberOfOnesInIndex).map(numbOnes => (numbOnes >= numbers.length - numbOnes) ? '1' : '0').join('');
	return findMostCommonBit ? commonString : inverseBinaryString(commonString);
}

let inverseBinaryString = function(text) {
	return [...text].map(char => (char === '1') ? '0' : '1').join('');
}

let run = async function() {
	let numbers = [];

	await util.readFile(`${__dirname}/p1input.txt`, function(line) {
		numbers.push(line);
	});

	let gamma = findCommonNumber(numbers, true);
	let epsi = findCommonNumber(numbers, false);

	return parseInt(gamma, 2) * parseInt(epsi, 2);
}

module.exports = {
	run
}
