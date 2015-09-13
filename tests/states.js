import STATES from '../src/states';
import assert from 'assert';

describe('Monitor.STATES', () => {
	it('should each be defined', () => {
		assert(STATES.UNKNOWN, 'Unknown state');
		assert(STATES.HEALTHY, 'Healthy state');
		assert(STATES.WARNING, 'Warning state');
		assert(STATES.DANGER, 'Danger state');
	});
	it('should each be unique', () => {
		assert.notEqual(STATES.UNKNOWN, STATES.HEALTHY);
		assert.notEqual(STATES.UNKNOWN, STATES.WARNING);
		assert.notEqual(STATES.UNKNOWN, STATES.DANGER);
		assert.notEqual(STATES.HEALTHY, STATES.WARNING);
		assert.notEqual(STATES.HEALTHY, STATES.DANGER);
		assert.notEqual(STATES.WARNING, STATES.DANGER);
	});
	it('should each have a string representation', () => {
		assert.equal(String(STATES.UNKNOWN), 'unknown', 'Unknown state');
		assert.equal(String(STATES.HEALTHY), 'healthy', 'Healthy state');
		assert.equal(String(STATES.WARNING), 'warning', 'Warning state');
		assert.equal(String(STATES.DANGER), 'danger', 'Danger state');
	});
	it('should each have a numeric representation (valid states)', () => {
		assert.equal(Number(STATES.HEALTHY), 2, 'Healthy state');
		assert.equal(Number(STATES.WARNING), 1, 'Warning state');
		assert.equal(Number(STATES.DANGER), 0, 'Danger state');
	});
	it('should each have a numeric representation (invalid state)', () => {
		assert(isNaN(Number(STATES.UNKNOWN)), 'Unknown state');
	});
	it('should be capable of comparison', () => {
		let state;
		state = STATES.WARNING;
		assert(state < STATES.HEALTHY, 'System is having trouble');
		state = STATES.HEALTHY;
		assert(state > STATES.DANGER, 'System is not completely offline');
		state = STATES.UNKNOWN;
		assert(!(state >= STATES.WARNING || state <= STATES.WARNING), 'System cannot be compared');
	});
});
