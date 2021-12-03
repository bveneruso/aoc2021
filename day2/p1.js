const util = require('../helpers/util.js');

// 3:26, would've been faster if not having my run messed up :(
let run = async function() {
	let depth = 0, horizontal = 0;

	await util.readFile(`${__dirname}/p1input.txt`, function(cmd) {

		let [ dir, amt ] = cmd.split(' ');
		amt = Number(amt);

		if(dir === 'forward') {
			horizontal += amt;
		}
		if(dir === 'down') {
			depth += amt;
		}
		if(dir === 'up') {
			depth -= amt;
		}

	});

	return depth * horizontal;
}

module.exports = {
	run
}
