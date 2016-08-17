var Asteroid = require("./asteroid.js");
var Util = require("./util.js");

function Game () {
  this.asteroids = [];

  this.addAsteroids();
}

Game.DIM_X = 500;
Game.DIM_Y = 500;
Game.NUM_ASTERIODS = 10;

Game.prototype.addAsteroids = function () {
  for (var i = 0; i < Game.NUM_ASTERIODS; i++) {
    this.asteroids.push(new Asteroid({game: this}));
  }
};

Game.prototype.randomPosition = function () {
  return [Math.random() * Game.DIM_X, Math.random() * Game.DIM_Y];
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  asteroids.forEach(function (aster) {
    aster.draw(ctx);
  });
};

Game.prototype.moveObjects = function (ms) {
  asteroids.forEach(function (aster) {
    aster.move(ms);
  });
};

module.exports = Game;
