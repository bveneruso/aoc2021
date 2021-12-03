const util = require('../helpers/util.js');

// 3:26, would've been faster if not having my run messed up :(
let run = async function() {
	let totalCount = 0;
	let numberOfOnesInIndex = {};
	let gamma = '';
	let epsi = '';

	await util.readFile(`${__dirname}/p1input.txt`, function(line) {
		totalCount++;
		gamma = '';
		epsi = '';
		for(let i = 0; i < line.length; i++) {
			if(line.charAt(i) === '1') {
				if(!numberOfOnesInIndex.hasOwnProperty(i))
					numberOfOnesInIndex[i] = 0;
				numberOfOnesInIndex[i]++;
			}

			let oneCount = numberOfOnesInIndex.hasOwnProperty(i) ? numberOfOnesInIndex[i] : 0;
			gamma += (oneCount > totalCount - oneCount) ? '1' : '0';
			epsi += (oneCount > totalCount - oneCount) ? '0' : '1';
		}
	});
	console.log('gamma is ' + gamma + ' and epsi is ' + epsi);
	return parseInt(gamma, 2) * parseInt(epsi, 2);
}

module.exports = {
	run
}
