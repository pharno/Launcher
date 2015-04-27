/*eslint-env browser */

'use strict';

var ipc = require('ipc');

function launch (path) {
    ipc.send("launch",path);
}

function chooseGame(e){
    e.preventDefault();
    ipc.send("chooseGame");
}

ipc.on("chooseGame-reply", function(arg){
    $('#file').val(arg);
})

function addGame(gameName,path) {
    ipc.send("addGame", {
        "name": gameName,
        "path": path
    })
}

function getGameList() {
    ipc.send("getGameList");
}

ipc.on("getGameList-reply", function(games){

    // '<a href="javascript:launch('game')" class="waves-effect waves-light btn grey">Launch game</a>';
    var gamesHtml = "";

    for (var i=0; i< games.length; i++){
        var game = games[i];
        gamesHtml += "<a href=\"javascript:launch('"+game["path"]+"')\" class=\"waves-effect waves-light btn grey\">Launch " + game["name"] + "</a>";
        console.log(gamesHtml);
    }

    $("#gamelist").html(gamesHtml)
//            
});