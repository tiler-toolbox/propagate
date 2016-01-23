'use strict';

var expect = require('chai').expect;

var Tiler = require('./utils/loader')();

describe('Tiler.propagate', function () {

  it('should be a function', function () {
    expect(Tiler.propagate).to.be.a('function');
  });

  it('should expose register() and propagations', function () {
    expect(Tiler.propagate).to.contains.keys(['register', 'propagations']);
    expect(Tiler.propagate.register).to.be.a('function');
    expect(Tiler.propagate.propagations).to.be.an('object');
  });

  it('should throw an error with bad parameters', function () {
    [
      'string',
      true,
      -1,
      {},
      undefined,
      null
    ].forEach(function (elements) {
      expect(function () {
        Tiler.propagate('Test', elements);
      }).to.throws(Error, 'Propagation elements must be an Array or a NodeList');
    });
  });

  it('should instantiate the propagation and call run()', function () {
    var members = {
      elements:   null,
      parameters: null,
      callback:   null
    };

    var PropagationMock = function (elements, parameters) {
      members.elements   = elements;
      members.parameters = parameters;
    };

    PropagationMock.prototype.run = function (callback, finish) {
      members.callback = callback;
      finish();
    };

    var elements = [1, true, 'Hello, friend.'];
    var parameters = {test: true};
    var callback = function () {};

    var finish = function () {
      expect(members.elements).to.equal(elements);
      expect(members.parameters).to.equal(parameters);
      expect(members.callback).to.equal(callback);
    };

    Tiler.propagate.propagations.mock = PropagationMock;

    Tiler.propagate('Mock', elements, parameters, callback, finish);
  });

  it('should convert a NodeList to an Array', function () {
    var list = new NodeList('Hello, friend.', 42);

    var PropagationMock = function (elements) {
      expect(elements).to.be.an.instanceOf(Array);
      expect(elements.length).to.equal(2);
      expect(elements[0]).to.equal('Hello, friend.');
      expect(elements[1]).to.equal(42);
    };

    PropagationMock.prototype.run = function () {};

    Tiler.propagate.propagations.mock = PropagationMock;

    Tiler.propagate('Mock', list);
  });

  describe('register()', function () {

    var PropagationMock = function () {};

    it('should add new propagations to the list', function () {
      Tiler.propagate.register('Test', function () {
        return PropagationMock;
      });

      expect(Tiler.propagate.propagations.test).to.be.a('function');
      expect(Tiler.propagate.propagations.test).to.equal(PropagationMock);
    });

    it('should throw an error on propagation name conflict', function () {
      expect(function () {
        Tiler.propagate.register('Test', function () {
          return PropagationMock;
        });
      }).to.throws(Error, 'A propagation named "test" is already registered');
    });

  });

});
