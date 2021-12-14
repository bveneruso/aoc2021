const util = require('../helpers/util.js');

// Question: Locate all low spots in the map (defined as a cell that has no adjacent cells lower than it, not counting diagonals)
//	The risk level of a cell is 1 plus its height
//	What is the sum of the risk level for all low points?

let getCoordString = function(row, indexInRow) {
	return row + ',' + indexInRow;
}

let buildMap = function(input) {
	let map = {}
	let row = 0;
	input.forEach(line => {
		for(let indexInRow = 0; indexInRow < line.length; indexInRow++) {
			let numb = Number(line[indexInRow]);
			map[getCoordString(row, indexInRow)] = numb;
		}
		row++;
	});
	return map;
}

// Returns -1 if no number at location
let getNumberAt = function (map, row, indexInRow) {
	let coord = getCoordString(row, indexInRow);
	return map[coord] ?? -1;
}

let getNumberAtCoord = function (map, coord) {
	return map[coord] ?? -1;
}

const ADJACENT_CELLS = [[1,0], [0,1], [-1,0], [0,-1]]

let findLowSpots = function(input, map) {
	let lowSpots = [];
	let row = 0;
	input.forEach(line => {
		for(let indexInRow = 0; indexInRow < line.length; indexInRow++) {
			let isLowSpot = true;
			for(let direction of ADJACENT_CELLS) {
				let neighborCellValue = getNumberAt(map, row + direction[0], indexInRow + direction[1]);
				let currCellValue = getNumberAt(map, row, indexInRow);
				if(neighborCellValue !== -1 && neighborCellValue <= currCellValue) {
					isLowSpot = false;
					break;
				}
			}
			if(isLowSpot) {
				lowSpots.push(getCoordString(row, indexInRow));
			}
		}
		row++;
	});
	return lowSpots;
}

let run = async function() {
	let input = await util.readFile(`${__dirname}/p1input.txt`);
	let map = buildMap(input);
	let lowSpots = findLowSpots(input, map);
	let sumOfRiskValues = 0;
	lowSpots.forEach(coord => {
		sumOfRiskValues += Number(getNumberAtCoord(map, coord)) + 1;
	})
	return sumOfRiskValues;
}

module.exports = {
	run
}


