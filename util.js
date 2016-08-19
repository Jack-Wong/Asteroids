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
