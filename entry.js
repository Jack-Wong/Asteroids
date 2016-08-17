var MovingObject = require("./moving_object.js");
var Util = require("./util.js");
var Asteroid = require("./asteroid.js");
var Game = require("./game.js");
var GameView = require("./game_view.js");

// var obj = new MovingObject({ pos: [30,30], vel: [10,10], radius: 5, color: "red"});
// var canvas = document.getElementById("circle");
// var ctx = canvas.getContext("2d");
// obj.draw(ctx);
 // var canvas = document.getElementById("game-canvas");
 // var ctx = canvas.getContext("2d");
 // asteroid.draw(ctx);

 document.addEventListener("DOMContentLoaded", function () {
   var canvas = document.getElementById("game-canvas");
   var ctx = canvas.getContext("2d");

   var game = new Game();
   new GameView(game, ctx).start();
 });
