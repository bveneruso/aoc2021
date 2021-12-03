const { mockInput } = require('../../helpers/testhelper.js')
const p2 = require('../p2.js');

describe('P2 tests', function() {
	it('Returns 5 for example', async () => {
		let input = [
			'199',
			'200',
			'208',
			'210',
			'200',
			'207',
			'240',
			'269',
			'260',
			'263'
		];
		mockInput(input);
		expect(await p2.run()).toBe(5);
	});
});
