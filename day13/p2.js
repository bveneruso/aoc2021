const util = require('../helpers/util.js');

let createPoint = function(x, y) {
	let point = {};
	point.x = x;
	point.y = y;

	point.foldAtX = function(xFold) {
		if(point.x > xFold) {
			point.x = xFold - (point.x - xFold);
		}
	}

	point.foldAtY = function(yFold) {
		if(point.y > yFold) {
			point.y = yFold - (point.y - yFold);
		}
	}

	return point;
}

let createPaper = function(inputArray) {
	let obj = {};
	obj.points = [];

	for(let line of inputArray) {
		if(line.indexOf(',') !== -1) {
			let [x, y] = line.split(',');
			obj.points.push(createPoint(x, y));
		}
	}

	obj.foldAtX = function(xFold) {
		for(let point of obj.points) {
			point.foldAtX(xFold);
		}
	}

	obj.foldAtY = function(yFold) {
		for(let point of obj.points) {
			point.foldAtY(yFold);
		}
	}

	obj.getShowingPoints = function() {
		let showingPoints = new Set();
		for(let point of obj.points) {
			let pos = point.x + ',' + point.y;
			showingPoints.add(pos);
		}
		return showingPoints;
	}

	return obj;
}

let generateImage = function(pointSet) {
	let maxX = 0;
	let maxY = 0;
	let output = '';

	for(let point of pointSet) {
		let [x, y] = point.split(',');
		if(Number(x) > maxX)
			maxX = Number(x);
		if(Number(y) > maxY)
			maxY = Number(y);
	}
	for(let y = 0; y <= maxY; y++) {
		let line = '';
		for(let x = 0; x <= maxX; x++) {
			line += pointSet.has(x + ',' + y) ? '#' : '.';
		}
		output += line + '\n';
	}

	return output;
}

let run = async function() {
	let input = await util.readFile(`${__dirname}/p2input.txt`);
	let paper = createPaper(input);
	for(let line of input) {
		if(line.indexOf('fold') !== -1) {
			let axis = line.substr(11,1);
			let number = Number(line.substr(13));
			if(axis === 'x') {
				paper.foldAtX(number);
			} else if(axis === 'y') {
				paper.foldAtY(number);
			}
		}
	}
	return generateImage(paper.getShowingPoints());
}

module.exports = {
	run
}


