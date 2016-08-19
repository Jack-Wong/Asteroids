/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var MovingObject = __webpack_require__(1);
	var Game = __webpack_require__(2);
	var GameView = __webpack_require__(5);

	document.addEventListener("DOMContentLoaded", function () {
	 var canvas = document.getElementById("game-canvas");
	 var ctx = canvas.getContext("2d");

	 var games = new Game();
	 new GameView(games, ctx).start();
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	
	function MovingObject (options) {
	  this.pos = options.pos;
	  this.vel = options.vel;
	  this.radius = options.radius;
	  this.color = options.color;
	  this.game = options.game;
	}

	MovingObject.prototype.draw = function (ctx) {
	  ctx.fillStyle = this.color;
	  ctx.beginPath();
	  ctx.arc(
	    this.pos[0],
	    this.pos[1],
	    this.radius,
	    0,
	    2* Math.PI,
	    true
	  );
	  ctx.fill();
	};

	MovingObject.prototype.move = function (ms) {
	  x = this.pos[0] + (this.vel[0] * (ms * (60 / 1000)));
	  y = this.pos[1] + (this.vel[1] * (ms * (60 / 1000)));

	  this.pos = this.game.wrap([x, y]);
	};

	MovingObject.prototype.isCollideWith = function (otherObject) {
	  var x = this.pos[0] - otherObject.pos[0];
	  var y= this.pos[1] - otherObject.pos[1];
	  var hypotenuse = Math.sqrt((x * x) + (y * y));
	  if (hypotenuse < (this.radius + otherObject.radius)) {
	    return true;
	  }
	  return false;
	};

	MovingObject.prototype.collideWith = function (otherObject) {
	  this.game.remove(this);
	  this.game.remove(otherObject);
	};

	module.exports = MovingObject;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Asteroid = __webpack_require__(3);
	var Ship = __webpack_require__(6);
	var Bullet = __webpack_require__(7);
	var MovingObject = __webpack_require__(1);

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

	Game.prototype.remove = function (obj) {
	  if (obj instanceof Asteroid) {
	    this.asteroids.splice(this.asteroids.indexOf(obj), 1);
	  } else if (obj instanceof Ship) {
	    this.ships.splice(this.ships.indexOf(obj), 1);
	  } else if (obj instanceof Bullet) {
	    this.bullet.splice(this.bullet.indexOf(obj), 1);
	  }};

	module.exports = Game;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(4);
	var MovingObject = __webpack_require__(1);
	var Game = __webpack_require__(2);
	var Ship = __webpack_require__(6);

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


/***/ },
/* 4 */
/***/ function(module, exports) {

	var Util = {
	  inherits: function (childClass, parentClass) {
	    function Surrogate () {}
	    Surrogate.prototype = parentClass.prototype;
	    childClass.prototype = new Surrogate ();
	  }
	};

	Util.randomVec = function(length) {
	  var rand1 = 1;
	  if (Math.random() > 0.5) {
	    rand1 *= -1;
	  }

	  var rand2 = 1;
	  if (Math.random() > 0.5) {
	    rand2 *= -1;
	  }

	  var vec = [Math.random() * length * rand1, Math.random() * length * rand2];
	  return vec;
	};

	module.exports = Util;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Game = __webpack_require__(2);
	var Ship = __webpack_require__(6);

	function GameView (game, ctx) {
	  this.game = game;
	  this.ctx = ctx;
	}

	GameView.prototype.start = function () {
	  function animate() {
	    this.bindKeyHandlers();
	    this.game.draw(this.ctx);
	    this.game.step();
	  }
	  setInterval(animate.bind(this), 20);
	};

	GameView.prototype.bindKeyHandlers = function () {
	  key("w", function() {ship.power([0, -1]);});
	  key("s", function() {ship.power([0, 1]);});
	  key("a", function() {ship.power([-1, 0]);});
	  key("d", function() {ship.power([1, 0]);});
	};

	module.exports = GameView;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var Game = __webpack_require__(2);
	var MovingObject = __webpack_require__(1);
	var Util = __webpack_require__(4);

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


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(4);
	var MovingObject = __webpack_require__(1);
	var Game = __webpack_require__(2);

	function Bullet (options) {
	  options.radius = 2;

	  MovingObject.call(this, options);
	}



	Util.inherits(Bullet, MovingObject);

	module.exports = Bullet;


/***/ }
/******/ ]);