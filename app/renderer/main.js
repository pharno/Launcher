'use strict';

var path = require('path');

var BrowserWindow = require('browser-window');
var app = require('app');


var mainWindow = null;


app.on('window-all-closed', function () {
	app.quit();
});


app.on('ready', function () {
	var window = new BrowserWindow({ width: 800, height: 600 });
	window.loadUrl(path.join('file://', __dirname, '/../browser/index.html'));

	window.webContents.on('did-finish-load', function () {
		window.webContents.send('update-page', 'This is a sentence which has been sent from the server 1234');

	});

	window.on('closed', function () {
		mainWindow = null;
	});
});
