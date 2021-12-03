const MOCK_UTILS = {
	readFile: jest.fn()
};
jest.mock('./util.js', () => {
	return MOCK_UTILS
});
let mockInput = function(inputArray) {
	MOCK_UTILS.readFile.mockImplementationOnce(function(fileName, callback) {
		return new Promise(function(resolve, reject) {
			for(let i = 0; i < inputArray.length; i++) {
				callback(inputArray[i]);
			}
			resolve();
		})
	});
}

module.exports = {
	mockInput
}
