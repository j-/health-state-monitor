import Monitor from '../monitor';
import assert from 'assert';

describe('Monitor', () => {
	describe('#constructor()', () => {
		it('should return an instance of the Monitor class', () => {
			const mon = new Monitor();
			assert(mon instanceof Monitor);
		});
	});
});
