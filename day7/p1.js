const util = require('../helpers/util.js');


// median
let findBestSpace = function(crabs) {
	crabs.sort();
	return crabs[Math.round((crabs.length - 1) / 2)]
}

let calculateFuelCost = function(crabs, target) {
	let fuelUsed = 0;
	crabs.forEach(x => fuelUsed += Math.abs(x - target));
	return fuelUsed;
}

let run = async function() {
	let input = await util.readFile(`${__dirname}/p1input.txt`);
	let crabs = input[0].split(',').map(x => Number(x));
	let target = findBestSpace(crabs);

	let fuelUsed = calculateFuelCost(crabs, target);
	return fuelUsed;
}

module.exports = {
	run
}


