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

let getBasinSize = function(map, coord) {

	let toExplore = [coord];
	let partOfBasin = new Set();
	let explored = new Set();
	do {
		let exploring = toExplore.pop();
		let [row, indexInRow] = exploring.split(',');
		row = Number(row);
		indexInRow = Number(indexInRow);
		let value = getNumberAt(map, row, indexInRow);
		explored.add(exploring);
		partOfBasin.add(exploring);
		for(let direction of ADJACENT_CELLS) {
			let neighborCoord = getCoordString(row + direction[0], indexInRow + direction[1]);
			let neighborValue = getNumberAtCoord(map, neighborCoord);
			if(neighborValue >= value && neighborValue !== 9 && !explored.has(neighborCoord)) {
				toExplore.push(neighborCoord);
			}
		}
	} while(toExplore.length > 0);

	return partOfBasin.size;
}

let run = async function() {
	let input = await util.readFile(`${__dirname}/p2input.txt`);
	let map = buildMap(input);
	let lowSpots = findLowSpots(input, map);
	let basinSizes = [];
	lowSpots.forEach(coord => {
		let size = getBasinSize(map, coord);
		basinSizes.push(size);
	});

	basinSizes = basinSizes.sort((x, y) => x - y)

	return basinSizes[basinSizes.length - 1] * basinSizes[basinSizes.length - 2] * basinSizes[basinSizes.length - 3];
}

module.exports = {
	run
}


