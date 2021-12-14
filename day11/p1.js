const util = require('../helpers/util.js');

let createOctopus = function(coord, energyLevel) {
	let octo = {};
	octo.energyLevel = energyLevel;
	octo.coord = coord;
	[octo.row, octo.col] = coord.split(',').map(x => Number(x));
	octo.neighbors = [];

	octo.tick = function() {
		let flashes = 0;
		octo.energyLevel++;
		if(octo.energyLevel == 10) {
			flashes++;
			octo.neighbors.forEach(neighbor => {
				flashes += neighbor.tick();
			});
		}
		return flashes;
	}

	octo.addNeighbor = function(octoBuddy) {
		octo.neighbors.push(octoBuddy);
	}

	octo.refresh = function() {
		if(octo.energyLevel > 9)
			octo.energyLevel = 0;
	}

	return octo;
}

let getCoord = function(row, col) {
	return row + ',' + col;
}

const ADJACENT_CELLS = [[1,0], [0,1], [1,1], [-1,0], [0,-1], [-1,-1], [-1,1], [1,-1]];

let run = async function() {
	let input = await util.readFile(`${__dirname}/p1input.txt`);

	// Generate octopus objects
	let octoMap = {};
	for(let row = 0; row < input.length; row++) {
		let line = input[row];
		for(let col = 0; col < line.length; col++) {
			let coord = getCoord(row, col);
			let digit = line.charAt(col);
			let octo = createOctopus(coord, Number(digit));
			octoMap[coord] = octo;
		}
	}

	// Add neighbors
	for(let octo of Object.values(octoMap)) {
		let row = octo.row;
		let col = octo.col;
		ADJACENT_CELLS.forEach(direction => {
			let neighborCoord = getCoord(row + direction[0], col + direction[1]);
			if(octoMap.hasOwnProperty(neighborCoord)) {
				octo.addNeighbor(octoMap[neighborCoord]);
			}
		});
	}

	let flashes = 0;
	for(let cycle = 0; cycle < 100; cycle++) {
		for(let octo of Object.values(octoMap)) {
			flashes += octo.tick();
		}
		for(let octo of Object.values(octoMap)) {
			octo.refresh();
		}
	}

	return flashes;
}

module.exports = {
	run
}


