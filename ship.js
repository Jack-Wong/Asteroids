var Game = require("./game.js");
var MovingObject = require("./moving_object.js");
var Util = require("./util.js");

function Ship (options) {
  options.radius = 15;
  options.color = "black";
  options.vel = [0, 0];
  options.pos = options.game.randomPosition();

  MovingObject.call(this, options);
}

Util.inherits(Ship, MovingObject);

Ship.prototype.relocate = function () {
  this.pos = this.game.randomPosition();
  this.vel = [0, 0];
};

Ship.prototype.power = function (impulse) {
  x = this.vel[0] + impulse[0];
  y = this.vel[1] + impulse[1];
  this.vel = [x, y];
};

Ship.prototype.fireBullet = function () {
  var bullet = new Bullet({
    pos: this.pos,
    color: this.color,
    vel: this.vel,
    game: this.game
  });
  this.game.add(bullet);
};

module.exports = Ship;
