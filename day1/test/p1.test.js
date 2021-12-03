const { mockInput } = require('../../helpers/testhelper.js')
const p1 = require('../p1.js');

describe('P1 tests', function() {
	it('Returns 2 for increasing chain of 3 numbers', async () => {
		let input = [
			'1',
			'2',
			'3',
		]
		mockInput(input);
		expect(await p1.run()).toBe(2);
	});

	it('Returns 0 for nonincreasing chain', async () => {
		let input = [
			'1',
			'0',
			'-1',
		]
		mockInput(input);
		expect(await p1.run()).toBe(0);
	});

	it('Properly uses value order, not lexicographical', async () => {

		// If we alphabetize, then 0002 comes before and this would count as increasing.
		// If we sort by vaule, 1 comes before 2, so it would not count as increasing
		let input = [
			'0002',
			'1',
		]
		mockInput(input);
		expect(await p1.run()).toBe(0);
	});
});
