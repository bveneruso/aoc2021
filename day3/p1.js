const util = require('../helpers/util.js');

/**
 * Generates a number with either the most common value for each bit or the least common
 * @param numbers Input array, numbers should be binary strings
 * @param findMostCommonBit True to find most common bits, false to find least common
 * @returns {string} Most or least common combination of bits
 */
let findCommonNumber = function(numbers, findMostCommonBit) {

	let commonString = '';

	for(let charIndex = 0; charIndex < numbers[0].length; charIndex++) {
		let count = 0;
		for(let numb of numbers) {
			if(numb.charAt(charIndex) === '1')
				count++
		}
		commonString += (count >= numbers.length - count) ? '1' : '0';
	}

	return findMostCommonBit ? commonString : inverseBinaryString(commonString);
}

let inverseBinaryString = function(text) {
	return [...text].map(char => (char === '1') ? '0' : '1').join('');
}

let run = async function() {
	let inputNumbers = await util.readFile(`${__dirname}/p1input.txt`);
	let gamma = findCommonNumber(inputNumbers, true);
	let epsi = findCommonNumber(inputNumbers, false);

	return parseInt(gamma, 2) * parseInt(epsi, 2);
}

module.exports = {
	run
}
