const day1p1 = require('./day1/p1.js');
const day1p2 = require('./day1/p2.js');
const day2p1 = require('./day2/p1.js');
const day2p2 = require('./day2/p2.js');
const day3p1 = require('./day3/p1.js');
const day3p2 = require('./day3/p2.js');

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
}

run();


