/**
 * System state enum. State is one of:
 *   - UNKNOWN
 *   - HEALTHY
 *   - WARNING
 *   - DANGER
 * @typedef {Symbol} State
 */

const STATES = {
	UNKNOWN: Symbol('unknown'),
	HEALTHY: Symbol('healthy'),
	WARNING: Symbol('warning'),
	DANGER: Symbol('danger'),
};

export default STATES;
