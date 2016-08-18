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

Util.inherits(Ship, MovingObject);


module.exports = Ship;
