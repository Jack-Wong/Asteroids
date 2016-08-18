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
	  if (hypotenuse < 50) {
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
	var MovingObject = __webpack_require__(1);

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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(4);
	var MovingObject = __webpack_require__(1);
	var Game = __webpack_require__(2);

	function Asteroid (options) {
	  options.radius = 25;
	  options.color = "black";
	  options.vel = Util.randomVec(5);
	  options.pos = options.pos || options.game.randomPosition();
	  
	  MovingObject.call(this, options);
	}

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
	    childClass.prototype.constructor = childClass;
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

	function GameView (game, ctx) {
	  this.game = game;
	  this.ctx = ctx;
	}

	GameView.prototype.start = function () {
	  function animate() {
	    this.game.draw(this.ctx);
	    this.game.step();
	  }
	  setInterval(animate.bind(this), 20);
	};

	module.exports = GameView;


/***/ }
/******/ ]);