[Health state monitor][repo]
============================

[![master branch build status][build-icon]][build-link]

Simple state machine which can be used to monitor the health of a system, job,
server, routine, connection, user or anything else.

## Usage

Create and configure a monitor instance. Ping it whenever there is activity from
the monitored system. Check the state at any given time or watch it for changes.

```js
var monitor = new Monitor();
monitor.warningThreshold = 1000 * 60 * 4; // 4 minutes
monitor.dangerThreshold = 1000 * 60 * 5; // 5 minutes

// Monitor any arbitrary system
system.on('message', function () {
	monitor.ping();
});

// Check state periodically
setInterval(function () {
	if (monitor.state !== Monitor.STATES.HEALTHY) {
		// System is no longer healthy
		// Handle appropriately
	}
}, 1000 * 10); // Every 10 seconds
```

## Documentation

Documentation is generated with [esdoc][esdoc]:

```sh
$ npm install esdoc --global
$ esdoc -c esdoc.json
```

## Tests

Tests are run with [Mocha][mocha] and [Babel][babel]:

```sh
$ npm install && npm run test
```

## License

[MIT license](LICENSE).

[repo]: https://github.com/j-/health-state-monitor
[build-icon]: https://travis-ci.org/j-/health-state-monitor.svg?branch=master
[build-link]: https://travis-ci.org/j-/health-state-monitor
[esdoc]: https://esdoc.org/
[mocha]: https://mochajs.org/
[babel]: https://babeljs.io/
