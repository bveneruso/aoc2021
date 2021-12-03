const util = require('../helpers/util.js');

// 1:50, not bad!
let run = async function() {
	let aim = 0, depth = 0, horizontal = 0;

	await util.readFile(`${__dirname}/p2input.txt`, function(cmd) {
		let [ dir, amt ] = cmd.split(' ');
		amt = Number(amt);

		if(dir === 'forward') {
			horizontal += amt;
			depth += aim * amt;
		}
		if(dir === 'down') {
			aim += amt;
		}
		if(dir === 'up') {
			aim -= amt;
		}

	});

	return depth * horizontal;
}

module.exports = {
	run
}
