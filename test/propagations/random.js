'use strict';

describe('Random', function () {

  it('should expose the propagation interface', function () {
    expect(Tiler.propagations.all).to.be.a('function');
    expect(Tiler.propagations.all).to.respondTo('run');
    expect(Tiler.propagations.all).to.respondTo('configure');
  });

  it('should run without optional parameter callback', function (done) {
    var elements = ['A', 'B', 'C'];
    var iterated = 0;

    Tiler.propagate('Random', elements, {
      delay: 1
    }, function () {
      if (++iterated === elements.length) {
        done();
      }
    });
  });

  it('should propagate over all elements', function () {
    var elements = ['A', 'B', 'C'];
    var iterated = [];

    Tiler.propagate('Random', elements, {
      delay: 1
    }, function (element, index) {
      iterated[index] = element;
    }, function () {
      elements.forEach(function (element, index) {
        expect(element).to.equal(iterated[index]);
      });
    });
  });

});
