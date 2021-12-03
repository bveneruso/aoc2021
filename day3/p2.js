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

/**
 * Recursively filter numbers, keeping only numbers that have the char at the given index
 * 	match the char in the string generated by either the most or least common char at that index
 * 	across the input string
 * @param numbers Input numbers
 * @param index Index to compare
 * @param findMostCommonBit Whether to generate a number based on the most or least common char at that index
 * @returns A filtered array of binary numbers
 */
let filterNumbers = function(numbers, index, findMostCommonBit) {
	if(numbers.length <= 1)
		return numbers;
	let generatedCommon = findCommonNumber(numbers, findMostCommonBit);
	let result = numbers.filter(numb => numb.charAt(index) === generatedCommon.charAt(index));
	if(result.length === 0)
		return [numbers[numbers.length - 1]]
	return filterNumbers(result, index + 1, findMostCommonBit);
}

let run = async function() {
	let binary = [];

	await util.readFile(`${__dirname}/p2input.txt`, function(line) {
		binary.push(line);
	});

	let bestOx = filterNumbers(binary, 0, true)[0];
	let bestO2 = filterNumbers(binary, 0, false)[0];

	return parseInt(bestOx, 2) * parseInt(bestO2, 2);
}

module.exports = {
	run
}
