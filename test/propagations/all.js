'use strict';

describe('All', function () {

  it('should expose the propagation interface', function () {
    expect(Tiler.propagations.all).to.be.a('function');
    expect(Tiler.propagations.all).to.respondTo('run');
  });

  it('should run without optional parameter callback', function (done) {
    var elements = ['A', 'B', 'C'];
    var iterated = 0;

    Tiler.propagate('All', elements, {}, function () {
      if (++iterated === elements.length) {
        done();
      }
    });
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
