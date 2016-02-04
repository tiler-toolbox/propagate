'use strict';

window.Tiler.propagation.register('All', function () {
  /**
   * Simpliest propagation, trigger all elements simultaneously.
   *
   * @class
   * @implements {PropagationInterface}
   * @memberof   Tiler.propagations
   * @param      {Array} elements - Elements array to iterate over
   */
  function All(elements) {
    this.elements = elements;
  }

  /** @inheritdoc */
  All.prototype.run = function (callback, finish) {
    this.elements.forEach(callback);

    if (typeof finish === 'function') {
      finish();
    }
  };

  return All;
});
