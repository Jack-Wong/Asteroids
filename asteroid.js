var Util = require("./util.js");
var MovingObject = require("./moving_object.js");
var Game = require("./game.js");
var Ship = require("./ship");

function Asteroid (options) {
  options.radius = 25;
  options.color = "blue";
  options.vel = Util.randomVec(5);
  options.pos = options.pos || options.game.randomPosition();

  MovingObject.call(this, options);
}

Util.inherits(Asteroid, MovingObject);

Asteroid.prototype.collideWith = function (otherObject) {
  if (otherObject instanceof Ship) {
    otherObject.relocate();
  }
};


module.exports = Asteroid;
