var MovingObject = require("./moving_object.js");
var Game = require("./game.js");
var GameView = require("./game_view.js");

document.addEventListener("DOMContentLoaded", function () {
 var canvas = document.getElementById("game-canvas");
 var ctx = canvas.getContext("2d");

 var games = new Game();
 new GameView(games, ctx).start();
});
