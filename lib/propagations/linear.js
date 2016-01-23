'use strict';

window.Tiler.propagate.register('Linear', function () {
  /**
   * Trigger one element at a time and line by line.
   *
   * @class
   * @memberof Tiler.propagate.propagations
   * @param    {Array}  elements   - Elements array to iterate over
   * @param    {object} parameters - Propagation parameters
   */
  function Linear(elements, parameters) {
    this.elements = [];
    this.delay = parameters.delay;

    var from = {
      bottom: (Array.isArray(parameters.origin) && parameters.origin[0] === 'bottom'),
      right:  (Array.isArray(parameters.origin) && parameters.origin[1] === 'right')
    };

    for (var i = 0; i < elements.length; i++) {
      var r = from.bottom ? parameters.rows    - 1 - Math.floor(i / parameters.rows) : Math.floor(i / parameters.rows);
      var c = from.right  ? parameters.columns - 1 - Math.floor(i % parameters.rows) : Math.floor(i % parameters.rows);

      var index = (parameters.direction === 'vertical') ? (c * parameters.rows + r) : (r * parameters.rows + c);

      this.elements[index] = elements[i];
    }
  }

  /**
   * Launch the propagation
   *
   * @param  {function} callback - Callback called for each element when the propagation reach it
   * @param  {function} finish   - Callback called when the propagation is done
   */
  Linear.prototype.run = function (callback, finish) {
    var delay = this.delay;

    this.elements.forEach(function (element, index) {
      setTimeout(function () {
        callback(element, index);
      }, index * delay);
    });

    setTimeout(finish, this.elements.length * delay);
  };

  return Linear;
});
