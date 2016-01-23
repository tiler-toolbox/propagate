'use strict';

var root = '../../lib/';

function forceRequire(id) {
  var path = id ? root + id : root;

  delete require.cache[require.resolve(path)];
  return require(path);
}

// NodeList mock

global.NodeList = function () {
  Array.call(this);
  this.push.apply(this, Array.apply(null, arguments));
};

global.NodeList.prototype = [];

module.exports = function (propagations) {
  global.window = {};

  forceRequire();

  (propagations || []).forEach(function (propagation) {
    forceRequire('propagations/' + propagation.toLowerCase());
  });

  var Tiler = global.window.Tiler;

  delete global.window;

  return Tiler;
};
