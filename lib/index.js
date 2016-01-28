'use strict';

/**
 * Namespace of the Tiler toolbox.
 * @namespace Tiler
 */
window.Tiler = window.Tiler || {};


/**
 * Abstract namespace for all propagations.
 * @namespace Tiler.propagations
 */


/**
 * Public interface that every propagation must implement
 *
 * @interface PropagationInterface
 */
/**
 * Launch the propagation
 *
 * @method PropagationInterface#run
 * @param  {function} callback - Callback called for each element when the propagation reach it
 * @param  {function} finish   - Callback called when the propagation is done
 */


(function (Tiler) {
  Tiler.propagations = {};

  /**
   * Get the internal key from the propagation name
   *
   * @private
   *
   * @param  {string} name - The propagation name
   * @return {string} Internal key of the propagation
   */
  function getInternalName(name) {
    return name.replace(/\s+/, '-').toLowerCase();
  }

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
    var key = getInternalName(propagation);

    if (!Tiler.propagations.hasOwnProperty(key)) {
      throw new Error('Propagation "' + propagation + '" does not exists');
    }

    if (elements instanceof NodeList) {
      elements = Array.prototype.slice.call(elements);
    }

    if (!Array.isArray(elements)) {
      throw new TypeError('Propagation elements must be an Array or a NodeList');
    }

    (new (Tiler.propagations[key])(elements, parameters)).run(callback, finish);
  };

  /**
   * Instanciate a new propagation
   *
   * @param  {string}               propagation - The type of the propagation to trigger
   * @param  {Array|NodeList}       elements    - The set of elements
   * @param  {object}               parameters  - The propagation options
   * @return {PropagationInterface} A propagation instance
   */
  Tiler.propagation = function (propagation, elements, parameters) {
    var key = getInternalName(propagation);

    if (!Tiler.propagations.hasOwnProperty(key)) {
      throw new Error('Propagation "' + propagation + '" does not exists');
    }

    return new (Tiler.propagations[key])(elements, parameters);
  };

  /**
   * Register a new propagation.
   *
   * @param  {string}   propagation - The new propagation name
   * @param  {function} factory     - Factory function of the new propagation
   */
  Tiler.propagation.register = function (propagation, factory) {
    var key = getInternalName(propagation);

    if (Tiler.propagations[key] !== void 0) {
      throw new Error('A propagation named "' + propagation + '" is already registered');
    }

    Tiler.propagations[key] = factory();
  };
})(window.Tiler);
