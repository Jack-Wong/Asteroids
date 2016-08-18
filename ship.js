var Game = require("./game.js");
var Util = require("./util.js");
var MovingObject = require("./moving_object.js");

function Ship (options) {
  options.radius = 15;
  options.color = "black";
  options.vel = [0, 0];
  option.pos = options.game.randomPosition();

  MovingObject.call(this, options);
}

Ship.prototype.relocate = function () {
  this.pos = this.game.randomPosition();
  this.vel = [0, 0];
};

Ship.prototype.power = function (impulse) {
  x = this.vel[0] + impulse[0];
  y = this.vel[1] + impulse[1];
  this.vel = [x, y];
};


Util.inherits(Ship, MovingObject);


module.exports = Ship;
