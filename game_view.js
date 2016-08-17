var Game = require("./game.js");

function GameView (game, ctx) {
  this.game = game;
  this.ctx = ctx;
}

GameView.prototype.start = function () {
  function animate() {
    this.game.draw(this.ctx);
    this.game.moveObjects(5);
  }
  setInterval(animate.bind(this), 20);
};

module.exports = GameView;
