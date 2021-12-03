const util = require('../helpers/util.js');

let findRealOxAndO2 = function(numbers) {
	let totalCount = 0;
	let numberOfOnesInIndex = {};
	let realOxy = '';
	let realO2 = '';
	for(let j = 0; j < numbers.length; j++) {
		totalCount++;
		let line = numbers[j];
		realOxy = '';
		realO2 = '';
		for (let i = 0; i < line.length; i++) {
			if (line.charAt(i) === '1') {
				if (!numberOfOnesInIndex.hasOwnProperty(i))
					numberOfOnesInIndex[i] = 0;
				numberOfOnesInIndex[i]++;
			}

			let oneCount = numberOfOnesInIndex.hasOwnProperty(i) ? numberOfOnesInIndex[i] : 0;
			realOxy += (oneCount >= totalCount - oneCount) ? '1' : '0';
			realO2 += (oneCount >= totalCount - oneCount) ? '0' : '1';
		}
	}
	return [realOxy, realO2];
}

let findClosestNumber = function(numbers, type) {
	let ourNumbers = [];
	ourNumbers.push(...numbers);
	let index = 0;

	while(ourNumbers.length > 1) {
		let [realOxy, realO2] = findRealOxAndO2(ourNumbers);
		let matches = [];
		for(let i = 0; i < ourNumbers.length; i++) {
			let number = ourNumbers[i];
			if(number.charAt(index) === (type === 'ox' ? realOxy : realO2).charAt(index)) {
				matches.push(number);
			}
		}

		ourNumbers = matches;
		index++;
	}
	return ourNumbers[0];
}

let run = async function() {
	let binary = [];

	await util.readFile(`${__dirname}/p2input.txt`, function(line) {
		binary.push(line);
	});

	let bestOx = findClosestNumber(binary, 'ox');
	let bestO2 = findClosestNumber(binary, 'o2');

	console.log('bestOx ' + bestOx + ', bestCo ' + bestO2);

	return parseInt(bestOx, 2) * parseInt(bestO2, 2);
}

module.exports = {
	run
}
