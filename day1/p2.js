const util = require('../helpers/util.js');

let run = async function() {

	let input = [];
	let increaseCount = 0;

	await util.readFile(`${__dirname}/p2input.txt`, function(depth) {
		input.push(Number(depth));
	});

	for(let i = 0; i < input.length - 3; i++) {
		let firstSum = input[i] + input[i + 1] + input[i + 2];
		let secondSum = input[i + 1] + input[i + 2] + input[i + 3];
		if(secondSum > firstSum)
			increaseCount++;
	}

	return increaseCount;
}


module.exports = {
	run
}
