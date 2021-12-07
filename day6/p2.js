const util = require('../helpers/util.js');

/**
 * High level approach:
 * 	Instead of simulating each fish individually, we know that every fish with the same number behaves the same way.
 * 		We can maintain a bucket for each number that contains the count of fish for each number, then iterate
 * 		through the days.
 */

const NEW_FISH_DELAY = 8;
const AFTER_BIRTH_DELAY = 6;
let simulateADay = function(fishBuckets) {
	let newBuckets = {};
	for(let i = 0; i < 9; i++) {
		newBuckets[i] = 0;
	}
	for(let i = 0; i < 9; i++) {
		let fishInBucket = fishBuckets[i];
		if(i === 0) {
			newBuckets[AFTER_BIRTH_DELAY] += fishInBucket;
			newBuckets[NEW_FISH_DELAY] += fishInBucket;
		} else {
			newBuckets[i - 1] += fishInBucket;
		}
	}

	return newBuckets;
}

let run = async function() {
	let input = await util.readFile(`${__dirname}/p2input.txt`);
	let fish = input[0].split(',').map(x => Number(x));
	let fishBuckets = {};
	for(let i = 0; i < 9; i++) {
		fishBuckets[i] = 0;
	}
	fish.forEach(f => {
		fishBuckets[f]++;
	});
	for(let day = 0; day < 256; day++) {
		fishBuckets = simulateADay(fishBuckets);
	}

	let fishSum = 0;
	for(let sum of Object.values(fishBuckets)) {
		fishSum += sum;
	}
	return fishSum;
}

module.exports = {
	run
}
