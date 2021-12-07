const day1p1 = require('./day1/p1.js');
const day1p2 = require('./day1/p2.js');
const day2p1 = require('./day2/p1.js');
const day2p2 = require('./day2/p2.js');
const day3p1 = require('./day3/p1.js');
const day3p2 = require('./day3/p2.js');
const day4p1 = require('./day4/p1.js');
const day4p2 = require('./day4/p2.js');
const day5p1 = require('./day5/p1.js');
const day5p2 = require('./day5/p2.js');
const day6p1 = require('./day6/p1.js');
const day6p2 = require('./day6/p2.js');
const day7p1 = require('./day7/p1.js');
const day7p2 = require('./day7/p2.js');

let run = async function() {
	console.log('day1 p1, should be 1655');
	console.log(await day1p1.run());

	console.log('day1 p2, should be 1683');
	console.log(await day1p2.run());

	console.log('day2 p1, should be 1524750');
	console.log(await day2p1.run());

	console.log('day2 p2, should be 1592426537');
	console.log(await day2p2.run());

	console.log('day3 p1, should be 738234');
	console.log(await day3p1.run());

	console.log('day3 p2, should be 3969126');
	console.log(await day3p2.run());

	console.log('day4 p1 should be 54275');
	console.log(await day4p1.run());

	console.log('day4 p2 should be 13158');
	console.log(await day4p2.run());

	console.log('day5 p1 should be 6005');
	console.log(await day5p1.run());

	console.log('day5 p2 should be 23864');
	console.log(await day5p2.run());

	console.log('day6 p1 should be 360761');
	console.log(await day6p1.run());

	console.log('day6 p2 should be 1632779838045');
	console.log(await day6p2.run());

	console.log('day7 p1 should be 99053143');
	console.log(await day7p1.run());

	console.log('day7 p2 should be 99053143');
	console.log(await day7p2.run());
}

run();


