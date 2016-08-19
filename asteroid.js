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

Asteroid.prototype.collideWith = function (otherObject) {
  console.log(otherObject);
  
  if (otherObject instanceof Ship) {
    otherObject.relocate();
  }
};

Util.inherits(Asteroid, MovingObject);

module.exports = Asteroid;
