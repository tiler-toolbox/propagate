'use strict';

/**
 * Namespace of the Tiler toolbox.
 * @namespace Tiler
 */
var Tiler = window.Tiler = window.Tiler || {};

/**
 * Trigger a propagation over a set of elements
 *
 * @param  {string}         propagation - The type of the propagation to trigger
 * @param  {Array|NodeList} elements    - The set of elements
 * @param  {object}         parameters  - The propagation options
 * @param  {function}       callback    - Callback applied on each element when the propagation reach it
 * @param  {function}       finish      - Callback called at the end of the propagation
 */
Tiler.propagate = function (propagation, elements, parameters, callback, finish) {
  if (elements instanceof NodeList) {
    elements = Array.prototype.slice.call(elements);
  }

  if (!Array.isArray(elements)) {
    throw new TypeError('Propagation elements must be an Array or a NodeList');
  }

  (new (Tiler.propagate.propagations[propagation.toLowerCase()])(elements, parameters)).run(callback, finish);
};

/**
 * Namespace for all propgation classes.
 * @namespace
 */
Tiler.propagate.propagations = {};

/**
 * Register a new propagation.
 *
 * @param  {string}   name    - The new propagation name
 * @param  {function} factory - Factory function of the new propagation
 */
Tiler.propagate.register = function (name, factory) {
  name = name.toLowerCase();

  if (Tiler.propagate.propagations[name] !== void 0) {
    throw new Error('A propagation named "' + name + '" is already registered');
  }

  Tiler.propagate.propagations[name] = factory();
};
