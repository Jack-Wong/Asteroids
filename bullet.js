var Util = require("./util.js");

function Bullet (options) {
  options.radius = 2;
}

Util.inherits(Bullet, MovingObject);
