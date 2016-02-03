'use strict';

window.Tiler.propagation.register('Linear', function () {
  /**
   * Trigger one element at a time and line by line.
   *
   * @class
   * @implements {PropagationInterface}
   * @memberof   Tiler.propagations
   * @param      {Array}  elements   - Elements array to iterate over
   * @param      {object} parameters - Propagation parameters
   */
  function Linear(elements, parameters) {
    this.original = elements;
    this.configure(parameters);
  }

  /** @inheritdoc */
  Linear.prototype.configure = function (parameters) {
    this.elements = [];
    this.delay = parameters.delay;

    var from = {
      bottom: (Array.isArray(parameters.origin) && parameters.origin[0] === 'bottom'),
      right:  (Array.isArray(parameters.origin) && parameters.origin[1] === 'right')
    };

    // Get the initial position

    var initial = {
      row:    (from.bottom) ? parameters.rows    - 1 : 0,
      column: (from.right)  ? parameters.columns - 1 : 0
    };

    // Get the movement between each element

    var increment = {
      row:    (from.bottom) ? -1 : 1,
      column: (from.right)  ? -1 : 1
    };

    // Create the iteration array

    var current = {
      row:    initial.row,
      column: initial.column
    };

    for (var i = 0; this.elements.length < this.original.length; i++) {
      var index = current.row * parameters.columns + current.column;

      if (typeof this.original[index] !== 'undefined') {
        this.elements.push({
          element: this.original[index],
          index:   index
        });
      }

      if (parameters.direction === 'vertical') {
        current.row += increment.row;

        if (current.row < 0 || current.row >= parameters.rows) {
          current.row = initial.row;
          current.column += increment.column;
        }
      } else {
        current.column += increment.column;

        if (current.column < 0 || current.column >= parameters.columns) {
          current.column = initial.column;
          current.row += increment.row;
        }
      }
    }
  };

  /** @inheritdoc */
  Linear.prototype.run = function (callback, finish) {
    var delay = this.delay;

    this.elements.forEach(function (element, index) {
      setTimeout(function () {
        callback(element.element, element.index);
      }, index * delay);
    });

    setTimeout(finish, this.elements.length * delay);
  };

  return Linear;
});
