'use strict';

var expect = require('chai').expect;

describe('All', function () {

  it('should export a factory function', function () {
    global.window = {
      Tiler: {
        propagate: {
          register: function (name, factory) {
            expect(name).to.equal('All');
            expect(factory).to.be.a('function');

            var All = factory();

            expect(All).to.be.a('function');
            expect(All).to.respondTo('run');

            delete global.window;
          }
        }
      }
    };

    require('../../lib/propagations/all');
  });

  it('should register', function () {
    var Tiler = require('../utils/loader')(['All']);

    expect(Tiler.propagate.propagations.all).to.be.a('function');
    expect(Tiler.propagate.propagations.all).to.respondTo('run');
  });

  it('should propagate over all elements', function () {
    var Tiler = require('../utils/loader')(['All']);

    var elements = ['A', 'B', 'C'];
    var iterated = [];

    Tiler.propagate('All', elements, {}, function (element, index) {
      iterated[index] = element;
    }, function () {
      elements.forEach(function (element, index) {
        expect(element).to.equal(iterated[index]);
      });
    });
  });

});
