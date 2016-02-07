'use strict';

window.Tiler.propagation.register('Random', function () {
  var defaults = {
    delay: 100
  };

  /* eslint-disable */

  /**
   * Scrambles the elements of an array.
   *
   * @author Jonas Raoni Soares Silva
   * @see    {@link http://jsfromhell.com/array/shuffle}
   *
   * @param  {Array} v - The array to scramble
   * @return {Array} - The v array with scrambled elements
   */
  function shuffle(v) {
    for(var j, x, i = v.length; i; j = parseInt(Math.random() * i), x = v[--i], v[i] = v[j], v[j] = x);
    return v;
  }

  /* eslint-enable */

  /**
   * Trigger elements sequentially in random order.
   *
   * @class
   * @implements {PropagationInterface}
   * @memberof   Tiler.propagations
   * @param      {Array}  elements   - Elements array to iterate over
   * @param      {object} parameters - Propagation parameters
   */
  function Random(elements, parameters) {
    this.elements = elements.map(function (element, index) {
      return {index: index, element: element};
    });

    this.configure(parameters);
  }

  /* istanbul ignore next */
  /** @inheritdoc */
  Random.prototype.configure = function (parameters) {
    this.delay = parameters.delay || defaults.delay;
  };

  /** @inheritdoc */
  Random.prototype.run = function (callback, finish) {
    shuffle(this.elements.slice()).forEach(function (element, index) {
      setTimeout(function () {
        callback(element.element, element.index);
      }, index * this.delay);
    }.bind(this));

    setTimeout(finish, this.elements.length * this.delay);
  };

  return Random;
});
