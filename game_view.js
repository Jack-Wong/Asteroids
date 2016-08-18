var Game = require("./game.js");

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
  key(up, function() {ship.power([0, -1]);});
  key(down, function() {ship.power([0, 1]);});
  key(left, function() {ship.power([-1, 0]);});
  key(right, function() {ship.power([1, 0]);});
};

module.exports = GameView;
