'use strict';

var expect = require('chai').expect;

describe('Linear', function () {

  it('should export a factory function', function () {
    global.window = {
      Tiler: {
        propagate: {
          register: function (name, factory) {
            expect(name).to.equal('Linear');
            expect(factory).to.be.a('function');

            var Linear = factory();

            expect(Linear).to.be.a('function');
            expect(Linear).to.respondTo('run');

            delete global.window;
          }
        }
      }
    };

    require('../../lib/propagations/linear');
  });

  it('should register', function () {
    var Tiler = require('../utils/loader')(['Linear']);

    expect(Tiler.propagate.propagations.linear).to.be.a('function');
    expect(Tiler.propagate.propagations.linear).to.respondTo('run');
  });

  it('should propagate linearly over all elements', function (done) {
    var Tiler = require('../utils/loader')(['Linear']);

    var elements = ['A', 'B', 'C', 'D'];

    var scenarios = [
      {
        origin:    ['top', 'left'],
        direction: 'horizontal',
        result:    ['A', 'B', 'C', 'D']
      },
      {
        origin:    ['bottom', 'left'],
        direction: 'horizontal',
        result:    ['C', 'D', 'A', 'B']
      },
      {
        origin:    ['top', 'right'],
        direction: 'horizontal',
        result:    ['B', 'A', 'D', 'C']
      },
      {
        origin:    ['bottom', 'right'],
        direction: 'horizontal',
        result:    ['D', 'C', 'B', 'A']
      },
      {
        origin:    ['top', 'left'],
        direction: 'vertical',
        result:    ['A', 'C', 'B', 'D']
      },
      {
        origin:    ['bottom', 'left'],
        direction: 'vertical',
        result:    ['C', 'A', 'D', 'B']
      },
      {
        origin:    ['top', 'right'],
        direction: 'vertical',
        result:    ['B', 'D', 'A', 'C']
      },
      {
        origin:    ['bottom', 'right'],
        direction: 'vertical',
        result:    ['D', 'B', 'C', 'A']
      }
    ];

    (function next() {
      var scenario = scenarios.shift();

      if (!scenario) {
        return done();
      }

      var parameters = {
        rows:    2,
        columns: 2,
        delay:   1,

        origin:    scenario.origin,
        direction: scenario.direction
      };

      Tiler.propagate('Linear', elements, parameters, function (element) {
        expect(element).to.equal(scenario.result.shift());
      }, function () {
        expect(scenario.result.length).to.equal(0);
        next();
      });
    })();
  });

});
