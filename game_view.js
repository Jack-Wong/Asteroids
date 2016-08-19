var Game = require("./game.js");
var Ship = require("./ship.js");

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
