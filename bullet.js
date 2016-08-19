var Util = require("./util.js");
var MovingObject = require("./moving_object.js");
var Game = require("./game.js");

function Bullet (options) {
  options.radius = 2;

  MovingObject.call(this, options);
}



Util.inherits(Bullet, MovingObject);

module.exports = Bullet;
