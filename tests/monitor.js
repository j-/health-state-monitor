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
	describe('#getStateAtTime()', () => {
		it('should be in an unknown state by default', () => {
			const mon = new Monitor();
			const state = mon.getStateAtTime(new Date());
			assert.equal(state, Monitor.STATES.UNKNOWN);
		});
		it('should return the appropriate state as time passes', () => {
			const now = new Date();
			const inTenSeconds    = new Date(now.getTime() + 1000 * 10);
			const inTwentySeconds = new Date(now.getTime() + 1000 * 20);
			const inThirtySeconds = new Date(now.getTime() + 1000 * 30);
			const inFortySeconds  = new Date(now.getTime() + 1000 * 40);
			const inFiftySeconds  = new Date(now.getTime() + 1000 * 50);
			const mon = new Monitor({
				lastPing: now,
				warningThreshold: 1000 * 20,
				dangerThreshold: 1000 * 40,
			});
			assert.equal(mon.getStateAtTime(now),             Monitor.STATES.HEALTHY, 'System is healthy at last ping time');
			assert.equal(mon.getStateAtTime(inTenSeconds),    Monitor.STATES.HEALTHY, 'System is healthy before the warning threshold');
			assert.equal(mon.getStateAtTime(inTwentySeconds), Monitor.STATES.WARNING, 'System is in warning state at the warning threshold');
			assert.equal(mon.getStateAtTime(inThirtySeconds), Monitor.STATES.WARNING, 'System is in warning state after the warning threshold but before the danger threshold');
			assert.equal(mon.getStateAtTime(inFortySeconds),  Monitor.STATES.DANGER,  'System is in danger state at the danger threshold');
			assert.equal(mon.getStateAtTime(inFiftySeconds),  Monitor.STATES.DANGER,  'System is in danger state after the danger threshold');
		});
	});
});
