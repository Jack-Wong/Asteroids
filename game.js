var Asteroid = require("./asteroid.js");
var MovingObject = require("./moving_object.js");

function Game () {
  this.asteroids = [];

  this.addAsteroids();
}

Game.DIM_X = 500;
Game.DIM_Y = 500;
Game.NUM_ASTERIODS = 100;

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
  this.asteroids.forEach(function (aster) {
    aster.draw(ctx);
  });
};

Game.prototype.moveObjects = function (ms) {
  this.asteroids.forEach(function (aster) {
    aster.move(ms);
  });
};

Game.prototype.wrap = function (pos) {
  if (pos[0] > Game.DIM_X) {
    pos[0] = pos[0] % Game.DIM_X;
  } else if (pos[0] < 0) {
    pos[0] = Game.DIM_X - (pos[0] % Game.DIM_X);
  }
  if (pos[1] > Game.DIM_Y) {
    pos[1] = pos[1] % Game.DIM_X;
  } else if (pos[1] < 0) {
    pos[1] = Game.DIM_Y - (pos[1] % Game.DIM_Y);
  }
  return pos;
};

Game.prototype.checkCollisions = function () {
  for (var i = 0; i < this.asteroids.length; i++) {
    for (var j = 0; j < this.asteroids.length; j++) {
      if ( this.asteroids[i] !== this.asteroids[j] &&
          this.asteroids[i].isCollideWith(this.asteroids[j])){
            this.asteroids[i].collideWith(this.asteroids[j]);
        // alert("COLLISION");
      }
    }
  }
};

Game.prototype.step = function () {
  this.moveObjects(10);
  this.checkCollisions();
};

Game.prototype.remove = function (asteroid) {
  this.asteroids.splice(this.asteroids.indexOf(asteroid), 1);
};

module.exports = Game;
