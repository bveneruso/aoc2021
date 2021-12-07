const util = require('../helpers/util.js');

const NEW_FISH_DELAY = 8;
const AFTER_BIRTH_DELAY = 6;
let simulateADay = function(fishList) {
	let newFishCount = 0;
	for(let i = 0; i < fishList.length; i++) {
		if(fishList[i] === 0) {
			newFishCount++;
			fishList[i] = AFTER_BIRTH_DELAY;
		} else {
			fishList[i]--;
		}
	}
	for(let i = 0; i < newFishCount; i++) {
		fishList.push(NEW_FISH_DELAY);
	}
	return fishList;
}

let run = async function() {
	let input = await util.readFile(`${__dirname}/p1input.txt`);
	let fish = input[0].split(',').map(x => Number(x));
	for(let day = 0; day < 80; day++) {
		fish = simulateADay(fish);
	}
	return fish.length;
}

module.exports = {
	run
}
