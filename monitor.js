import STATES from 'states';

/**
 * Main health state monitor class.
 */
export default class Monitor {
	/**
	 * Create a new instance of the system health state monitor class.
	 * @param {Object} [options] Options to assign to this instance
	 */
	constructor (options = {}) {
		/**
		 * When the monitor was last notified that the system was healthy.
		 * @type {Date}
		 */
		this.lastPing = null;
		/**
		 * Number of milliseconds until the state will change to 'warning'.
		 * @type {Number}
		 */
		this.warningThreshold = null;
		/**
		 * Number of milliseconds until the state will change to 'danger'.
		 * @type {Number}
		 */
		this.dangerThreshold = null;
		Object.assign(this, options);
	}

	/**
	 * Notify the monitor that a system message has been received.
	 * @param {Date|Number|String} [date=now] When the message was received
	 * @return {Date} The new `lastPing` value
	 */
	ping (date = Date.now()) {
		this.lastPing = new Date(date);
		return this.lastPing;
	}

	/**
	 * Find the state at a given time; past, present or future.
	 * @param {Date} time Time to check
	 * @return {State} System state
	 */
	getStateAtTime (time) {
		const { dangerTime, warningTime } = this;
		// The time or either threshold is invalid
		if (isNaN(time) || isNaN(dangerTime) || isNaN(warningTime)) {
			return STATES.UNKNOWN;
		}
		// The current time has passed the danger time
		else if (time > dangerTime) {
			return STATES.DANGER;
		}
		// The current time has passed the warning time
		else if (time > warningTime) {
			return STATES.WARNING;
		}
		// Everything is OK
		return STATES.HEALTHY;
	}

	/**
	 * The current system state.
	 * @type {State} System state
	 */
	get state () {
		return this.getStateAtTime(Date.now());
	}

	/**
	 * The time when state will change from 'healthy' to 'warning'.
	 * @type {Date}
	 */
	get warningTime () {
		const lastPing = Number(this.lastPing);
		const threshold = this.warningThreshold;
		return new Date(lastPing + threshold);
	}

	/**
	 * The time when state will change from 'warning' to 'danger'.
	 * @type {Date}
	 */
	get dangerTime () {
		const lastPing = Number(this.lastPing);
		const threshold = this.dangerThreshold;
		return new Date(lastPing + threshold);
	}
}

Object.defineProperty(Monitor, 'STATES', {
	get: () => STATES,
});
