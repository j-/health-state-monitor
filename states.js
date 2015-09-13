/**
 * Defines a system state.
 */
export class State {
	/**
	 * Create a new state. Won't be used outside of this file.
	 * @param {String} name State name
	 * @param {Number} value State value
	 */
	constructor (name, value) {
		/**
		 * Readable state name.
		 * @type {String}
		 */
		this.name = name;
		/**
		 * Internal value.
		 * @type {Number}
		 */
		this.value = value;
	}

	/**
	 * Get the state's raw value.
	 * @return {Number} Value
	 */
	valueOf () {
		return this.value;
	}


	/**
	 * Get the state's readable name.
	 * @return {String} Name
	 */
	toString () {
		return this.name;
	}
}

/**
 * Map of possible system states. Values are:
 *   - UNKNOWN
 *   - HEALTHY
 *   - WARNING
 *   - DANGER
 * @type {Object<State>}
 */
const STATES = {
	UNKNOWN: new State('unknown', NaN),
	HEALTHY: new State('healthy', 2),
	WARNING: new State('warning', 1),
	DANGER: new State('danger', 0),
};

export default STATES;
