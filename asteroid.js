var Util = require("./util.js");
var MovingObject = require("./moving_object.js");
var Game = require("./game.js");

function Asteroid (options) {
  options.radius = 25;
  options.color = "black";
  options.vel = Util.randomVec(5);
  options.pos = options.pos || options.game.randomPosition();
console.log(options);
  MovingObject.call(this, options);
}

Util.inherits(Asteroid, MovingObject);

module.exports = Asteroid;
