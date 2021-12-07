const util = require('../helpers/util.js');

let getCoordString = function(x, y) {
	return `${x},${y}`;
}

let getPointArrayFromLine = function(x1, y1, x2, y2) {
	let x = x1;
	let y = y1;
	let points = [];
	points.push(getCoordString(x, y));
	while(x !== x2 || y !== y2) {
		if(x !== x2)
			x += Math.sign(x2 - x1);
		if(y !== y2)
			y += Math.sign(y2 - y1);
		points.push(getCoordString(x, y));
	}
	return points;
}

const lineRegex = /(\d*),(\d*) -> (\d*),(\d*)/
let countPointsWith2OrMoreOverlaps = function(lineInput) {
	let intersectionsAtCoords = {};
	for(let line of lineInput) {
		let [, x1, y1, x2, y2] = line.match(lineRegex);
		let points = getPointArrayFromLine(Number(x1), Number(y1), Number(x2), Number(y2));
		for(let point of points) {
			if(!intersectionsAtCoords.hasOwnProperty(point))
				intersectionsAtCoords[point] = 0;
			intersectionsAtCoords[point]++;
		}
	}
	let pointCount = 0;
	for(let value of Object.values(intersectionsAtCoords)) {
		if(value >= 2)
			pointCount++;
	}
	return pointCount;
}

let run = async function() {
	let input = await util.readFile(`${__dirname}/p2input.txt`);
	return countPointsWith2OrMoreOverlaps(input);
}

module.exports = {
	run
}
