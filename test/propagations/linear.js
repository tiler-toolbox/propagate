'use strict';

describe('Linear', function () {

  it('should expose the propagation interface', function () {
    expect(Tiler.propagations.linear).to.be.a('function');
    expect(Tiler.propagations.linear).to.respondTo('run');
    expect(Tiler.propagations.all).to.respondTo('configure');
  });

  it('should run without optional parameter callback', function (done) {
    var elements = ['A', 'B', 'C'];
    var iterated = 0;

    var parameters = {
      rows:    1,
      columns: 3,
      delay:   1
    };

    Tiler.propagate('Linear', elements, parameters, function () {
      if (++iterated === elements.length) {
        done();
      }
    });
  });

  it('should ignore undefined elements', function (done) {
    var elements = ['A', 'B', 'C'];
    var result   = ['C', 'B', 'A'];

    var parameters = {
      rows:    2,
      columns: 2,
      delay:   1,
      origin:  ['bottom', 'right']
    };

    Tiler.propagate('Linear', elements, parameters, function (element, index) {
      expect(element).to.equal(result.shift());
      expect(index).to.equal(elements.indexOf(element));
    }, function () {
      expect(result.length).to.equal(0);
      done();
    });
  });

  it('should propagate linearly over all elements', function (done) {
    var elements = ['A', 'B', 'C', 'D', 'E', 'F'];

    var scenarios = [
      {
        origin:    ['top', 'left'],
        direction: 'horizontal',
        result:    ['A', 'B', 'C', 'D', 'E', 'F']
      },
      {
        origin:    ['bottom', 'left'],
        direction: 'horizontal',
        result:    ['D', 'E', 'F', 'A', 'B', 'C']
      },
      {
        origin:    ['top', 'right'],
        direction: 'horizontal',
        result:    ['C', 'B', 'A', 'F', 'E', 'D']
      },
      {
        origin:    ['bottom', 'right'],
        direction: 'horizontal',
        result:    ['F', 'E', 'D', 'C', 'B', 'A']
      },
      {
        origin:    ['top', 'left'],
        direction: 'vertical',
        result:    ['A', 'D', 'B', 'E', 'C', 'F']
      },
      {
        origin:    ['bottom', 'left'],
        direction: 'vertical',
        result:    ['D', 'A', 'E', 'B', 'F', 'C']
      },
      {
        origin:    ['top', 'right'],
        direction: 'vertical',
        result:    ['C', 'F', 'B', 'E', 'A', 'D']
      },
      {
        origin:    ['bottom', 'right'],
        direction: 'vertical',
        result:    ['F', 'C', 'E', 'B', 'D', 'A']
      }
    ];

    (function next() {
      var scenario = scenarios.shift();

      if (!scenario) {
        return done();
      }

      var parameters = {
        rows:    2,
        columns: 3,
        delay:   1,

        origin:    scenario.origin,
        direction: scenario.direction
      };

      Tiler.propagate('Linear', elements, parameters, function (element, index) {
        expect(element).to.equal(scenario.result.shift());
        expect(index).to.equal(elements.indexOf(element));
      }, function () {
        expect(scenario.result.length).to.equal(0);
        next();
      });
    })();
  });

});
