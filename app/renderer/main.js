'use strict';

var path = require('path');

var BrowserWindow = require('browser-window');

var dialog = require("dialog");

var app = require('app');

var ipc = require("ipc")

var child_process = require("child_process");

var mainWindow = null;

var flatfile = require('flat-file-db');
var db = flatfile.sync('launcher.db');

app.on('window-all-closed', function () {
	app.quit();
});

app.on('ready', function () {
    mainWindow = new BrowserWindow({ width: 1200, height: 800 });
	mainWindow.loadUrl(path.join('file://', __dirname, '/../browser/index.html'));


	mainWindow.on('closed', function () {
		mainWindow = null;
	});
});

ipc.on("launch", function(event,arg){
    console.log("launching " + arg)
    console.log(child_process.spawn(arg));
})

ipc.on("chooseGame", function(event, arg){
        event.sender.send("chooseGame-reply",dialog.showOpenDialog(mainWindow, 
            { properties: 
                [ 'openFile', 'openDirectory', 'multiSelections' ]
            }));
})

ipc.on("addGame", function(event, arg){
    var gamesList = db.get("games");
    if (gamesList === undefined){
        gamesList = [];
    }

    gamesList.push(arg)
    db.put("games", gamesList)
})

ipc.on("getGameList", function(event,arg){
    event.sender.send("getGameList-reply",db.get("games"));
})