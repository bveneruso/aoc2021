const util = require('../helpers/util.js');

let newBingo = function(boardLayout, boardWidth) {
	const board = {};
	board.movesMade = 0;
	board.boardWidth = boardWidth;
	board.boardLayout = boardLayout;
	board.boardHeight = boardLayout.length / boardWidth;
	board.filledNumbers = new Set();
	board.score = 0;
	board.won = false;

	board.fillNumber = function(number) {
		board.movesMade++;
		board.filledNumbers.add(number);
		if(board.checkComplete() && !board.won) {
			board.won = true;
			board.score = board.calculateScore(number);
			return true;
		}
		return false;
	}

	board.getScore = function() {
		return board.won ? board.score : -1;
	}

	board.getNumberAt = function(column, row) {
		let index = column + row * boardWidth;
		return board.boardLayout[index];
	}

	board.calculateScore = function(winningNumber) {
		// sum of all unmarked numbers * the winning number
		let sum = 0;
		for(let value of board.boardLayout) {
			if(!board.filledNumbers.has(value))
				sum += value;
		}
		return sum *= winningNumber;
	}

	board.checkComplete = function() {
		//check each column, each row, and the two diagonals

		// columns
		for(let column = 0; column < board.boardWidth; column++) {
			let isComplete = true;
			for(let row = 0; row < board.boardHeight; row++) {
				if(!board.filledNumbers.has(board.getNumberAt(column, row))) {
					isComplete = false;
					break;
				}
			}
			if(isComplete)
				return true;
		}

		// rows
		for(let row = 0; row < board.boardHeight; row++) {
			let isComplete = true;
			for(let column = 0; column < board.boardWidth; column++) {
				if(!board.filledNumbers.has(board.getNumberAt(column, row))) {
					isComplete = false;
					break;
				}
			}
			if(isComplete)
				return true;
		}

		return false;
	}

	return board;
}

let run = async function() {
	let input = await util.readFile(`${__dirname}/p1input.txt`);
	let numbers = input[0].split(',').map(x => Number(x));
	let currentBoardNumbers = [];
	let boards = [];
	let boardWidth = 0;
	for(let lineIndex = 2; lineIndex < input.length; lineIndex++) {
		let line = input[lineIndex].trim();
		if(line.length === 0) {
			boards.push(newBingo(currentBoardNumbers, boardWidth));
			currentBoardNumbers = [];
		} else {
			let row = [...line.split(' ').filter(x => x.length > 0)].map(x => Number(x));
			boardWidth = row.length;
			currentBoardNumbers.push(...row);
		}
	}

	// last board not guaranteed to have a newline
	if(currentBoardNumbers.length > 0)
		boards.push(newBingo(currentBoardNumbers, boardWidth));

	for(let drawnNumber of numbers) {
		for(let board of boards) {
			let won = board.fillNumber(drawnNumber);
			if(won)
				return board.getScore();
		}
	}

	return;
}

module.exports = {
	run
}
