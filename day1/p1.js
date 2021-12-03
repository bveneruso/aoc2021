const util = require('../helpers/util.js');

let run = async function() {
	let increaseCount = 0, lastValue = 0, index = 0;

	await util.readFile(`${__dirname}/p1input.txt`, function(depth) {
		if(index != 0 && Number(depth) > Number(lastValue)) {
			increaseCount++;
		}
		lastValue = depth;
		index++;
	});
	return increaseCount;
}

module.exports = {
	run
}
