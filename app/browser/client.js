/*eslint-env browser */

'use strict';

var ipc = require('ipc');

ipc.on('update-page', function (raw) {
	var app = document.querySelector('#app');
	app.innerHTML = raw;
});

ipc.on('debug', function (raw) {
	console.dir(raw);
});
