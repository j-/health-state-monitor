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
	describe('#ping()', () => {
		it('should update the last ping time', () => {
			const lastPing = new Date(Date.now() - 1000); // 1 second ago
			const mon = new Monitor({ lastPing });
			mon.ping();
			assert.notEqual(mon.lastPing.valueOf(), lastPing.valueOf());
		});
		it('should accept a ping date', () => {
			const lastPing = new Date(Date.now() - 1000); // 1 second ago
			const mon = new Monitor();
			mon.ping(lastPing);
			assert.equal(mon.lastPing.valueOf(), lastPing.valueOf());
		});
		it('should return the new last ping time', () => {
			const lastPing = new Date();
			const mon = new Monitor();
			const result = mon.ping(lastPing);
			assert.equal(result.valueOf(), lastPing.valueOf());
		});
	});
});
