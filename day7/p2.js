const util = require('../helpers/util.js');

/**
 * High level approach
 * 1. Calculate and store the cost to move each distance between 0 and the max distance between 2 crabs
 * 2. Create an empty map with key being the space number and value being the total fuel cost for all crabs to move to it
 * 3. For each crab, iterate over each possible destination, adding the fuel cost to get to that destination
 * 4. Keep track of the minimum fuel cost
 */

let costForDistance = {};
let calculateCostForDistances = function(maxDistance) {
	for(let i = 0; i <= maxDistance; i++) {
		let cost = 0;
		for(let j = 0; j <= i; j++) {
			cost += j;
		}
		costForDistance[i] = cost;
	}
}

// brute force, find dist to each space between min and max
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
	return fuelUsed;
}

module.exports = {
	run
}


