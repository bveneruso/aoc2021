const util = require('../helpers/util.js');


// brute force, find dist to each space between min and max, feels icky
let findBestSpace = function(crabs) {
	crabs.sort();
	let min = crabs[0];
	let max = crabs[crabs.length - 1];
	let distToEach = {};
	let minDist = 0;
	let target = 0;
	let hasMinDist = false;
	for(let i = min; i <= max; i++) {
		distToEach[i] = 0;
	}

	// could be improved via memoization?
	for(let crab of crabs) {
		for(let i = min; i <= max; i++) {
			distToEach[i] += Math.abs(crab - i);
		}
	}

	for(let i = min; i <= max; i++) {
		if(!hasMinDist || distToEach[i] < minDist) {
			hasMinDist = true;
			minDist = distToEach[i];
			target = i;
		}
	}

	return target;
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

	// fuel cost math is right
	let fuelUsed = calculateFuelCost(crabs, target);
	console.log('Moving to ' + target + ' using fuel ' + fuelUsed);
	return fuelUsed;
}

module.exports = {
	run
}


