const util = require('../helpers/util.js');

let createNode = function(name) {
	let obj = {};
	obj.name = name;
	obj.isBig = name !== name.toLowerCase();
	obj.neighbors = {};

	obj.addNeighbor = function(neighborNode) {
		obj.neighbors[neighborNode.name] = neighborNode;
	}

	obj.getNeighbors = function() {
		return obj.neighbors;
	}

	return obj;
}

let createNodeMap = function(inputArray) {
	let map = {};
	map.nodes = {};

	map.createChildNode = function(nodeName) {
		if(!map.nodes.hasOwnProperty(nodeName)) {
			map.nodes[nodeName] = createNode(nodeName);
		}
	}

	for(let line of inputArray) {
		let [nodeA, nodeB] = line.split('-');
		map.createChildNode(nodeA);
		map.createChildNode(nodeB);
		map.nodes[nodeA].addNeighbor(map.nodes[nodeB]);
		map.nodes[nodeB].addNeighbor(map.nodes[nodeA]);
	}

	return map;
}

// now we're allowed to visit a single small cave twice...
let findDistinctPaths = function(map, currNode, smallVisitedCaves, smallCaveVisitedTwice) {
	let paths = [];
	if(currNode === undefined) {
		currNode = map.nodes['start'];
		smallVisitedCaves = new Set();
		smallCaveVisitedTwice = false;
	}

	// base case, only 1 possible path, path has 1 node
	if(currNode.name === 'end') {
		return [['end']];
	}

	if(!currNode.isBig) {
		if(smallVisitedCaves.has(currNode.name))
			smallCaveVisitedTwice = true;
		smallVisitedCaves.add(currNode.name);
	}

	for(let neighbor of Object.values(currNode.neighbors)) {
		if(!smallVisitedCaves.has(neighbor.name) || (smallCaveVisitedTwice === false && neighbor.name !== 'start')) {
			let childPaths = findDistinctPaths(map, neighbor, new Set(smallVisitedCaves), smallCaveVisitedTwice);
			for(let path of childPaths) {
				paths.push([currNode.name, ...path]);
			}
		}
	}

	return paths;
}

let run = async function() {
	let input = await util.readFile(`${__dirname}/p2input.txt`);
	let map = createNodeMap(input);
	return findDistinctPaths(map).length;
	return;
}

module.exports = {
	run
}


