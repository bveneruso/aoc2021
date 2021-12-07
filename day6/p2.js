const util = require('../helpers/util.js');

// precondition: no starting fish numb is greater than 6 or has 0 as a numb
// any starting fish with the same numb will result in spawning the same number of kids
// therefore, we only need to calculate how many kids each number makes over a time period
//		we can't simulate it day by day, too slow
//		other things we can do...
//		math? is there an equation for this growth?
//		maybe instead of simulating each fish, we put them in buckets!!!
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
