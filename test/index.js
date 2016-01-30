'use strict';

describe('Tiler.propagate()', function () {

  afterEach(function () {
    if (Tiler.propagations.hasOwnProperty('mock')) {
      delete Tiler.propagations.mock;
    }
  });

  it('should be a function', function () {
    expect(window.Tiler).to.be.an('object');
    expect(Tiler.propagate).to.be.a('function');
  });

  it('should throw an error with unexistent propagation', function () {
    expect(function () {
      Tiler.propagate('Mock', []);
    }).to.throws(Error, 'Propagation "Mock" does not exists');
  });

  it('should throw an error with bad parameters', function () {
    Tiler.propagations.mock = function () {};

    [
      'string',
      true,
      -1,
      {},
      undefined,
      null
    ].forEach(function (elements) {
      expect(function () {
        Tiler.propagate('Mock', elements);
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

    Tiler.propagations.mock = PropagationMock;

    Tiler.propagate('Mock', elements, parameters, callback, finish);
  });

  it('should accept optional parameters', function () {
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
    var callback = function () {};

    var finish = function () {
      expect(members.elements).to.equal(elements);
      expect(members.parameters).to.deep.equal({});
      expect(members.callback).to.equal(callback);
    };

    Tiler.propagations.mock = PropagationMock;

    Tiler.propagate('Mock', elements, callback, finish);
  });

  it('should convert a NodeList to an Array', function () {
    var p = document.createElement('p');
    var a = document.createElement('a');
    var div = document.createElement('div');

    div.appendChild(p);
    div.appendChild(a);

    var PropagationMock = function (elements) {
      expect(elements).to.be.an.instanceOf(Array);
      expect(elements.length).to.equal(2);
      expect(elements[0]).to.equal(p);
      expect(elements[1]).to.equal(a);
    };

    PropagationMock.prototype.run = function () {};

    Tiler.propagations.mock = PropagationMock;

    Tiler.propagate('Mock', div.childNodes);
  });

});

describe('Tiler.propagation()', function () {

  it('should be a function', function () {
    expect(window.Tiler).to.be.an('object');
    expect(Tiler.propagation).to.be.a('function');
  });

  it('should expose register()', function () {
    expect(Tiler.propagation).to.contains.keys(['register']);
    expect(Tiler.propagation.register).to.be.a('function');
  });

  it('should throw an error with unexistent propagation', function () {
    expect(function () {
      Tiler.propagation('Mock', []);
    }).to.throws(Error, 'Propagation "Mock" does not exists');
  });

  it('should instantiate a propagation', function () {
    var elems  = ['A', 'B'];
    var params = {test: true};

    Tiler.propagations.mock = function (elements, parameters) {
      expect(elements).to.equal(elems);
      expect(parameters).to.equal(params);
    };

    var propagation = Tiler.propagation('Mock', elems, params);

    expect(propagation).to.be.instanceOf(Tiler.propagations.mock);
  });

  it('should accept optional parameters', function () {
    var elems  = ['A', 'B'];

    Tiler.propagations.mock = function (elements, parameters) {
      expect(elements).to.equal(elems);
      expect(parameters).to.deep.equal({});
    };

    var propagation = Tiler.propagation('Mock', elems);

    expect(propagation).to.be.instanceOf(Tiler.propagations.mock);
  });

  describe('register()', function () {

    var PropagationMock = function () {};

    it('should add new propagations to the list', function () {
      Tiler.propagation.register('Test', function () {
        return PropagationMock;
      });

      expect(Tiler.propagations.test).to.be.a('function');
      expect(Tiler.propagations.test).to.equal(PropagationMock);
    });

    it('should throw an error on propagation name conflict', function () {
      expect(function () {
        Tiler.propagation.register('Test', function () {
          return PropagationMock;
        });
      }).to.throws(Error, 'A propagation named "Test" is already registered');
    });

  });

});
