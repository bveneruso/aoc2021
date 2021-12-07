const util = require('../helpers/util.js');

let costForDistance = {};

let calculateCostForDistances = function(maxDistance) {
	for(let i = 0; i <= maxDistance; i++) {
		let cost = 0;

		// if dist is 3 (i = 3)
		// 0, 0,

		for(let j = 0; j <= i; j++) {
			cost += j;
		}
		costForDistance[i] = cost;
	}
}

// brute force, find dist to each space between min and max, feels icky
let findBestSpace = function(crabs) {
	crabs.sort((one, two) => one > two ? 1 : -1);
	let min = crabs[0];
	let max = crabs[crabs.length - 1];
	calculateCostForDistances(max - min);
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
			distToEach[i] += costToSpace(crab, i);
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

// moving 1 step costs 1, 2 steps costs 3, 3 stops costs 6, 4 steps cost 10, 5 steps costs 15
// 1,3,6,10,15, 21, 28
// added pattern in comparison to dist
// 0, 2, 4, 6, 10, 15, 21
// to calculate total cost for a number of steps, the calculation is
// it's not linear, it's maybe exponential? but not really? not factorial, not fibonacii
// we could memoize this cost? but I feel like there must be a good way to calculate it
let costToSpace = function(crab, target) {
	return costForDistance[Math.abs(crab - target)];
}

let calculateFuelCost = function(crabs, target) {
	let fuelUsed = 0;
	crabs.forEach(x => fuelUsed += Math.abs(costToSpace(x, target)));
	return fuelUsed;
}

let run = async function() {
	let input = await util.readFile(`${__dirname}/p2input.txt`);
	let crabs = input[0].split(',').map(x => Number(x));
	let target = findBestSpace(crabs);

	let fuelUsed = calculateFuelCost(crabs, target);
	console.log('Moving to ' + target + ' using fuel ' + fuelUsed);
	return fuelUsed;
}

module.exports = {
	run
}


