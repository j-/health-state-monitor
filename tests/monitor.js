import Monitor from '../monitor';
import assert from 'assert';

describe('Monitor', () => {
	describe('#constructor()', () => {
		it('should return an instance of the Monitor class', () => {
			const mon = new Monitor();
			assert(mon instanceof Monitor);
		});
		it('should not have any default values', () => {
			const mon = new Monitor();
			assert(!mon.lastPing);
			assert(!mon.warningThreshold);
			assert(!mon.dangerThreshold);
		});
		it('should accept an options object', () => {
			const lastPing = new Date();
			const warningThreshold = 1000;
			const dangerThreshold = 2000;
			const mon = new Monitor({
				lastPing,
				warningThreshold,
				dangerThreshold,
			});
			assert.equal(mon.lastPing, lastPing);
			assert.equal(mon.warningThreshold, warningThreshold);
			assert.equal(mon.dangerThreshold, dangerThreshold);
		});
	});
});
