'use strict';

describe('All', function () {

  it('should expose the propagation interface', function () {
    expect(Tiler.propagations.all).to.be.a('function');
    expect(Tiler.propagations.all).to.respondTo('run');
  });

  it('should propagate over all elements', function () {
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
