import STATES from 'states';

class Monitor {
	constructor (options = {}) {
		this.lastPing = null;
		this.warningThreshold = null;
		this.dangerThreshold = null;
		Object.assign(this, options);
	}

	ping (date = Date.now()) {
		this.lastPing = new Date(date);
		return this.lastPing;
	}

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

	get state () {
		return this.getStateAtTime(Date.now());
	}

	get warningTime () {
		const lastPing = Number(this.lastPing);
		const threshold = this.warningThreshold;
		return new Date(lastPing + threshold);
	}

	get dangerTime () {
		const lastPing = Number(this.lastPing);
		const threshold = this.dangerThreshold;
		return new Date(lastPing + threshold);
	}
}

Object.defineProperty(Monitor, 'STATES', {
	get: () => STATES,
});

export default Monitor;
