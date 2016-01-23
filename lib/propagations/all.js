'use strict';

window.Tiler.propagate.register('All', function () {
  /**
   * Simpliest propagation, trigger all elements simultaneously.
   *
   * @constructor
   * @memberof Tiler.propagate.propagations
   * @param    {Array} elements - Elements array to iterate over
   */
  function All(elements) {
    this.elements = elements;
  }

  /**
   * Launch the propagation
   *
   * @param  {function} callback - Callback called for each element when the propagation reach it
   * @param  {function} finish   - Callback called when the propagation is done
   */
  All.prototype.run = function (callback, finish) {
    this.elements.forEach(callback);
    finish();
  };

  return All;
});
