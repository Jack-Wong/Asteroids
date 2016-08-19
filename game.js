var Asteroid = require("./asteroid.js");
var Ship = require("./ship.js");
var Bullet = require("./bullet.js");
var MovingObject = require("./moving_object.js");

function Game () {
  this.asteroids = [];
  this.ships = [];
  this.bullets = [];

  this.addAsteroids();
  this.addShip();
}

Game.DIM_X = 500;
Game.DIM_Y = 500;
Game.NUM_ASTERIODS = 1;

Game.prototype.allObjects = function () {
  return this.asteroids.concat(this.ships);
};

Game.prototype.add = function (obj) {
  if (obj instanceof Asteroid) {
    this.asteroids.push(obj);
  } else if (obj instanceof Ship) {
    this.ships.push(obj);
  } else if (obj instanceof Bullet) {
    this.bullets.push(obj);
  }
};

Game.prototype.addAsteroids = function () {
  for (var i = 0; i < Game.NUM_ASTERIODS; i++) {
    this.asteroids.push(new Asteroid({game: this}));
  }
};

Game.prototype.addShip = function () {
  var ship = new Ship({game: this});
  this.add(ship);
};

Game.prototype.randomPosition = function () {
  return [Math.random() * Game.DIM_X, Math.random() * Game.DIM_Y];
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  this.allObjects().forEach(function (obj) {
    obj.draw(ctx);
  });
};

Game.prototype.moveObjects = function (ms) {
  this.allObjects().forEach(function (obj) {
    obj.move(ms);
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
  for (var i = 0; i < this.allObjects().length; i++) {
    for (var j = 0; j < this.allObjects().length; j++) {
      var obj1 = this.allObjects()[i];
      var obj2 = this.allObjects()[j];
      if (obj1 !== obj2 && obj1.isCollideWith(obj2)) {
        obj1.collideWith(obj2);
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
