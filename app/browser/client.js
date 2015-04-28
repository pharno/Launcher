/*eslint-env browser */

'use strict';

var ipc = require('ipc');
var fs = require('fs');

var handlebars = require("./resources/bower_components/handlebars/handlebars.js");
var layouts = require('./resources/bower_components/handlebars-layouts/dist/handlebars-layouts.js');
 
layouts.register(handlebars);


var filenames = fs.readdirSync("./app/browser/resources/templates/");
 
filenames.forEach(function (filename) {
  var matches = /^([^.]+).hbs$/.exec(filename);
  if (!matches) {
    return;
  }
  var name = matches[1];
  var template = fs.readFileSync("./app/browser/resources/templates/" + filename, 'utf8');
  handlebars.registerPartial(name, template);
});


function launch (path) {
    ipc.send("launch",path);
}

function loadPage(page) {

    var templateCode = fs.readFile("./app/browser/"+ page, {encoding:"utf-8"}, function(err,data){
        if (err) throw err;
         var template = handlebars.compile(data);
        $('html').html(template({"test":"asd"}));
        $('.username').html("username");
    });
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