var Vec2;

if (typeof require !== 'undefined') {
  Vec2 = require('../vec2');
} else {
  Vec2 = window.Vec2;
}

if (typeof JSON === 'undefined' && typeof require !== 'undefined') {
  var JSON = require('JSON2');
}

var ok = function(a, message) {
  if (!a) {
    throw new Error(message || 'fail');
  }
};


var throws = function(fn) {
  var caught;
  try { fn(); } catch (e) {
    caught = true;
  }

  if (!caught) {
    throw new Error('did not throw as expected');
  }
};

function Vec2Extended() {
  return Vec2.apply(this, arguments);
}
Vec2Extended.prototype = Object.create(Vec2.prototype);
Vec2Extended.prototype.constructor = Vec2Extended;

describe('Vec2', function() {
  describe('constructor', function() {
    it('sets x and y if they are passed', function() {
      var v = new Vec2(5, 6);
      ok(v.x === 5);
      ok(v.y === 6);
    });

    it('defaults x and y to zero if not passed', function() {
      var v = new Vec2();
      ok(v.x === 0);
      ok(v.y === 0);
    });

    it('x, y are always created on the object itself', function() {
      var v = new Vec2();
      ok(v.hasOwnProperty('x'));
      ok(v.hasOwnProperty('y'));
    });

    it('should return a new instance if not called with new', function() {
      var v = Vec2(1, 2);
      ok(v.x === 1);
      ok(v.y === 2);
    });

    it('should extract x,y from an incoming object', function() {
      var v = Vec2({ x: 10, y: 0 });
      ok(v.x === 10);
      ok(v.y === 0);
    });

    it('should extract x,y from an array', function() {
      var v = Vec2([10, 5]);
      ok(v.equal(Vec2(10, 5)));
    })
  });

  describe('#change', function() {
    it('should add an observer callback when fn is passed', function() {
      var v = Vec2();
      v.change(function(){});
      ok(v.observers.length === 1);
    });

    it('should call the observers when fn is not passed', function() {
      var v = Vec2(), called = false;

      v.change(function(){
        called = true;
      });

      v.change();

      ok(v.observers.length === 1);
      ok(called === true);
    });

    it('should include a clone of previous values as a second param', function() {
      var v = Vec2(), called = false;

      v.change(function(vec, prev){
        ok(vec === v);
        ok(prev !== v);
        ok(vec.equal(Vec2(10, 10)));
        ok(prev.equal(Vec2(0, 0)));
      });

      v.set(10, 10);
    });
  });

  describe('#ignore', function() {
    it('should add an observer callback when fn is passed', function() {
      var v = Vec2();

      var ignoreLater = function(){};
      v.change(ignoreLater);
      v.change(function(){});
      ok(v.observers.length === 2);
      v.ignore(ignoreLater);
      ok(v.observers.length === 1);
    });

    it('should remove all observers when no fn is passed', function() {
      var v = Vec2();
      v.change(function() {});
      v.change(function() {});

      ok(v.observers.length === 2);
      v.ignore();
      ok(v.observers.length === 0);
    });

    it('should noop when no observers have been added', function() {
      var v = Vec2();
      v.ignore();
    });
  });

  describe('#clone', function() {
    it('should return a new Vec2 with the same component values', function() {
      var v = Vec2(0, 1);
      var v2 = v.clone();
      ok(v !== v2);
    });
  });

  describe('#set', function() {
    it('sets x and y', function() {
      var v = new Vec2();
      v.set(10, 9);
      ok(v.x === 10);
      ok(v.y === 9);
    });

    it('is chainable', function() {
      var v = new Vec2();
      ok(v.set(1,2) === v);
    });

    it('should call change()', function() {
      var called = false;
      var v = Vec2().change(function() {
        called=true;
      });

      v.set(1,1);

      ok(called === true);
    });

    it('should not call change if new value === old value', function () {
      var v = Vec2(), called = false;

      v.set(0, 0);

      v.change(function(){
        called = true;
      });

      v.set(0, 0);

      ok(called === false);
    });

    it('should clean values', function() {
      var v1 = Vec2(0.1, 0.1);
      var v2 = Vec2(0.2, 0.2);
      var result = v1.add(v2, true);
      ok(result.x === 0.3);
      ok(result.y === 0.3);
    });

    it('should accept a Vec2', function () {
      var v1 = Vec2();
      var v2 = Vec2(Math.random(), Math.random());
      ok(v1.x !== v2.x);
      ok(v1.y !== v2.y);
      v1.set(v2);
      ok(v1.x === v2.x);
      ok(v1.y === v2.y);
    });

    it('should not call change if notify=false', function () {
      var v = Vec2(), called = false;

      v.set(0, 0);

      v.change(function(){
        called = true;
      });

      v.set(7, 5, false);
      ok(called === false);
    });

    it('should not call change if notify=false, with set(Vec2)', function () {
      var v = Vec2(), called = false;

      v.set(0, 0);

      v.change(function(){
        called = true;
      });

      v.set(new Vec2(7, 5), false);
      ok(called === false);
    });

    it('should not clone for notify if notify=false', function() {
      var v = Vec2();
      v.change(function(){});
      v.clone = function() { throw new Error('should not clone'); }
      v.set(10, 10, false);
    });

    it('should not clone for notify if no observers', function() {
      var v = Vec2();
      v.clone = function() { throw new Error('should not clone'); }
      v.set(10, 10);
    });
  });

  describe('#zero', function() {
    it('sets x and y to 0', function() {
      var v = new Vec2(1, 2);
      v.zero();
      ok(v.x === 0);
      ok(v.y === 0);
    });

    it('is chainable', function() {
      var v = new Vec2();
      ok(v.zero() === v);
    });
  });

  describe('#negate', function() {
    it('makes positive values negative', function() {
      var
      v = new Vec2(2, 2),
      v2 = v.negate();

      ok(v2.x === -2);
      ok(v2.y === -2);
    });

    it('makes negative values positive', function() {
      var
      v = new Vec2(-2, -2),
      v2 = v.negate();

      ok(v2.x === 2);
      ok(v2.y === 2);
    });

    it('is chainable when returnNew is falsy', function() {
      var v = new Vec2(1,1);
      ok(v.negate() === v);
    });

    it('returns a new Vec2 when returnNew is truthy', function() {
      var v = new Vec2(1,1);
      ok(v.negate(true) !== v);
    });
  });

  describe('math', function() {
    var v, v2;

    beforeEach(function() {
      v = new Vec2(1,2);
      v2 = new Vec2(10, 10);
    });

    describe('#add', function() {
      it('adds to both this.x and this.y when returnNew is falsy', function() {
        v.add(v2);
        ok(v.x === 11);
        ok(v.y === 12);
      });

      it('returns a new vector when returnNew is truthy', function() {
        var r = v.add(v2, true);
        ok(v.x === 1);
        ok(v.y === 2);

        ok(r.x === 11);
        ok(r.y === 12);
      });

      it('returns itself when returnNew is falsy', function() {
        var r = v.add(v2);
        ok(v.x === 11);
        ok(v.y === 12);
        ok(r === v);
      });

      it('supports passing x,y', function() {
        var v = new Vec2(1, 2);
        ok(v.add(1,1) === v);
      });

      it('supports passing x,y (returnNew)', function() {
        var v = new Vec2(1, 2);
        var v2 = v.add(1,1, true)
        ok(v2 !== v);
        ok(v2.equal(2, 3));
      });

      it('supports passing [x,y]', function() {
        var v = new Vec2(1, 2);
        ok(v.add([1,1]) === v);
        ok(v.equal(2, 3));
      });

      it('supports passing [x,y] (returnNew)', function() {
        var v = new Vec2(1, 2);
        var v2 = v.add([1, 1], true)
        ok(v2 !== v);
        ok(v2.equal(2, 3));
      });

    });

    describe('#subtract', function() {
      it('subtracts from both this.x and this.y when returnNew is falsy', function() {
        v.subtract(v2);
        ok(v.x === -9);
        ok(v.y === -8);
      });

      it('returns a new vector when returnNew is truthy', function() {
        var r = v.subtract(v2, true);
        ok(v.x === 1);
        ok(v.y === 2);

        ok(r.x === -9);
        ok(r.y === -8);
      });

      it('returns itself when returnNew is falsy', function() {
        var v = new Vec2(1,2);
        ok(v.subtract(new Vec2(1,1)) === v);
      });

      it('supports passing x,y', function() {
        var v = new Vec2(1, 2);
        ok(v.subtract(1,1) === v);
      });

      it('supports passing x,y (returnNew)', function() {
        var v = new Vec2(1, 2);
        var v2 = v.subtract(1,1, true)
        ok(v2 !== v);
        ok(v2.equal(0, 1));
      });

      it('supports passing [x,y]', function() {
        var v = new Vec2(1, 2);
        ok(v.subtract([1,1]) === v);
        ok(v.equal(0, 1));
      });

      it('supports passing [x,y] (returnNew)', function() {
        var v = new Vec2(1, 2);
        var v2 = v.subtract([1, 1], true)
        ok(v2 !== v);
        ok(v2.equal(0, 1));
      });
    });

    describe('#multiply', function() {
      it('multiplies both this.x and this.y when returnNew is falsy', function() {
        v.multiply(v2);
        ok(v.x === 10);
        ok(v.y === 20);
      });

      it('returns a new vector when returnNew is truthy', function() {
        var r = v.multiply(v2, true);
        ok(v.x === 1);
        ok(v.y === 2);

        ok(r.x === 10);
        ok(r.y === 20);
      });

      describe('scalar argument', function() {
        it('accepts a scalar', function() {
          var v = new Vec2(1,2);

          v.multiply(5);

          ok(v.x === 5);
          ok(v.y === 10);
        });

        it('returns a new Vec2 when returnNew is truthy', function() {
          var
          v = new Vec2(1,2),
          r = v.multiply(5, true);

          ok(r.x === 5);
          ok(r.y === 10);

          ok(v.x === 1);
          ok(v.y === 2);
        });

        it('returns itself when returnNew is falsy', function() {
          var v = new Vec2(1,2);
          ok(v.multiply(1) === v);
        });
      });

      it('supports passing x,y', function() {
        var v = new Vec2(1, 2);
        ok(v.multiply(1,1) === v);
      });

      it('supports passing x,y (returnNew)', function() {
        var v = new Vec2(1, 2);
        var v2 = v.multiply(5,2, true)
        ok(v2 !== v);
        ok(v2.equal(5, 4));
      });

      it('supports passing [x,y]', function() {
        var v = new Vec2(1, 2);
        ok(v.multiply([5, 2]) === v);
        ok(v.equal(5, 4));
      });

      it('supports passing [x,y] (returnNew)', function() {
        var v = new Vec2(1, 2);
        var v2 = v.multiply([5, 2], true)
        ok(v2 !== v);
        ok(v2.equal(5, 4));
      });
    });

    describe('#rotate', function() {
      it('accepts a scalar angle in radians', function() {
        var v = new Vec2(10, 20);

        var rotated = v.rotate(1.2, false, true);
        ok(Number(rotated.x).toFixed(4) === '-15.0172');
        ok(Number(rotated.y).toFixed(4) === '16.5675');
      });

      it('accepts a scalar angle in radians (inverse)', function() {
        var v = new Vec2(10, 20);

        var rotated = v.rotate(1.2, true, true);
        ok(Number(rotated.x).toFixed(4) === '22.2644');
        ok(Number(rotated.y).toFixed(4) === '-2.0732');
      });

      it('returns a new vector if returnNew is truthy', function() {
        var v = new Vec2(10, 20);
        ok(v.rotate(1.0, false, true) !== v);
      });

      it('returns itself when returnNew is falsy', function() {
        var v = new Vec2(10, 20);
        ok(v.rotate(1.0, true) === v);
      });
    });

    describe('#length', function() {
      it('calculates the length', function() {
        ok(v2.length() === 14.142135623730951);
      });

      it('is always positive', function() {
        v2.subtract(new Vec2(100, 200));
        ok(v2.length() > 0);
      });
    });

    describe('#lengthSquared', function() {
      it('squares x and y, then sum them', function() {
        ok(v2.lengthSquared() === 200);
      });

      it('is always be positive', function() {
        v2.subtract(new Vec2(100, 200));
        ok(v2.length() > 0);
      });
    });

    describe('#distance', function() {
      it('returns a new Vec2 representing the distance between two vectors', function() {
        var
        v = new Vec2(0, 10),
        v2 = new Vec2(0,0),
        d = v.distance(v2);

        ok(d === 10);
      });
    });

    describe('#normalize', function() {
      it('properly normalizes a vector', function() {
        var v = new Vec2(2, 5);
        var v2 = v.normalize();
        ok(v2.x === 0.37139068);
        ok(v2.y === 0.92847669);
        ok(v === v2);
      });

      it('should return a new vector when returnNew is truthy', function() {
        var v = new Vec2(2, 5);
        var v2 = v.normalize(true);
        ok(v2.x === 0.37139068);
        ok(v2.y === 0.92847669);
        ok(v !== v2);
      });

      it ('should properly normalize a vector at 0,0', function() {
        var v = Vec2(0,0);
        v.normalize();
        ok(v.x === 0);
        ok(v.y === 0);
      });
    });

    describe('#skew', function() {

      it('negates the y axis and swap x/y', function() {
        var v3 = v.skew();
        ok(v3 === v);
        ok(v3.x === -2);
        ok(v3.y === 1);
      });

      it('negates the y axis and swap x/y (returnNew)', function() {
        var v3 = v.skew(true);
        ok(v3 !== v);
        ok(v.x === 1);
        ok(v.y === 2);
        ok(v3.x === -2);
        ok(v3.y === 1);
      });
    });

    describe('#abs', function() {
      it('returns a new vector with positive values', function() {
        var
        v = new Vec2(-10, -100),
        e = new Vec2(10, 100);

        ok(v.abs().equal(e));
      });

      it('itself with positive values applied', function() {
        var
        v = new Vec2(-10, -100),
        e = new Vec2(10, 100),
        result = v.abs();

        ok(result.equal(e));
        ok(result === v);
      });

      it('should return a new Vec2 when returnNew is specified', function() {
        var
        v = new Vec2(-10, -100),
        result = v.abs(true);
        ok(result !== v);
      });
    });

    describe('#min', function() {
      it('returns a new Vec2 containing the smallest values when returnNew is truthy', function() {
        var
        v = new Vec2(-10, 100),
        v2 = new Vec2(10, -100),
        e = new Vec2(-10, -100);

        ok(e.min(v2, true).equal(e));
      });

      it('applies the smallest values to itself when returnNew is falsy', function() {
        var
        v = new Vec2(-10, 100),
        v2 = new Vec2(10, -100),
        e = new Vec2(-10, -100);

        ok(e === e.min(v2));
      });
    });

    describe('#max', function() {
      it('returns a new Vec2 containing the largest values when returnNew is truthy', function() {
        var
        v = new Vec2(-10, 100),
        v2 = new Vec2(10, -100),
        e = new Vec2(10, 100);

        ok(e.max(v2, true).equal(e));
      });

      it('applies the maximum values to itself if returnNew is falsy', function() {
        var
        v = new Vec2(-10, 100),
        v2 = new Vec2(10, -100),
        e = new Vec2(10, 100);

        ok(e === e.max(v2));
      });
    });
  });

  describe('#nearest', function() {
    it('returns nearest Vec2 to this Vec2', function() {
      var
      v = new Vec2(0, 0),
      closest = new Vec2(1, 0),
      middle = new Vec2(2, 0),
      far = new Vec2(3, 0);

      var nearest = v.nearest([middle, closest, far]);

      ok(nearest.equal(closest));
    });

    it('returns first of nearest Vec2s if there are multiple nearest', function() {
      var
      v = new Vec2(0, 0),
      closest = new Vec2(1, 0),
      anotherClosest = new Vec2(-1, 0);

      var nearest = v.nearest([closest, anotherClosest]);

      ok(nearest.equal(closest));
    });

    it('returns null if no Vec2s are in given Array', function() {
      var v = new Vec2(0, 0);

      var nearest = v.nearest([]);

      ok(nearest === null);
    });
  });

  describe('#equal', function() {
    it('returns true when both Vec2s have the same values', function() {
      var
      v = new Vec2(1,2),
      v2 = new Vec2(1,2);

      ok(v.equal(v2));
    });

    it('returns false when the Vec2s have the different values', function() {
      var
      v = new Vec2(1,2),
      v2 = new Vec2(1,1);

      ok(!v.equal(v2));
    });

    it('operates on 2 scalars', function() {
      var v = new Vec2(1,2);
      ok(v.equal(1,2));
      ok(!v.equal(2,1));
    });

    it('detects values that are closer than Vec2.precision', function() {
      var v = new Vec2(1, 2);
      ok(v.equal(Vec2(1.0 + 1e-14, 2)));
    });

    it('supports x/y', function() {
      var v = new Vec2(1, 2);
      ok(v.equal(1, 2));
    });

    it('supports array', function() {
      var v = new Vec2(1, 2);
      ok(v.equal([1, 2]));
    });
  });

  describe('clamp', function() {
    it('lowers to the upper bound if above', function() {
      var
      val = new Vec2(4, 6),
      low = new Vec2(0, 0),
      high = new Vec2(2, 4);

      ok(val.clamp(low, high).equal(2,4));
    });

    it('raises to the lowerbound if below', function() {
      var
      val = new Vec2(-2, -10),
      low = new Vec2(0, 0),
      high = new Vec2(2, 4);

      ok(val.clamp(low, high).equal(0,0));
    });

    it('applies the result to itself if returnNew is false', function() {
      var
      val = new Vec2(4, 6),
      low = new Vec2(0, 0),
      high = new Vec2(2, 4);

      ok(val.clamp(low, high) === val);
    });

    it('returns a new Vec2 if returnNew is truthy', function() {
      var
      val = new Vec2(4, 6),
      low = new Vec2(0, 0),
      high = new Vec2(2, 4);

      ok(val.clamp(low, high, true) !== val);
    });
  });

  describe('#lerp', function() {
    it('should return the first point when 0', function() {
      var v = Vec2(5, 5).lerp(Vec2(100, 5), 0);
      ok(v.x === 5);
      ok(v.y === 5);
    });

    it('should return the last point when 1', function() {
      var v = Vec2(5, 5).lerp(Vec2(100, 5), 1);
      ok(v.x === 100);
      ok(v.y === 5);
    });

    it('should return the halfway point when .5', function() {
      var v = Vec2(0, 5).lerp(Vec2(100, 5), 0.5);
      ok(v.x === 50);
      ok(v.y === 5);
    });

    it('should return the halfway point when .5 (returnNew)', function() {
      var v = Vec2(0, 5);
      var v2 = v.lerp(Vec2(100, 5), 0.5, true);

      ok(v.x === 0);
      ok(v.y === 5);
      ok(v2.x === 50);
      ok(v2.y === 5);
    });
  });

  describe('#dot', function() {
    it('should return the dot product of this vector', function() {
      var dot = Vec2(10, 10).dot(Vec2(5, 15));
      ok(dot === 200);
    });
  });

  describe('#perpDot', function() {
    it('should return the dot product of this vector', function() {
      var dot = Vec2(10, 10).perpDot(Vec2(5, 15));
      ok(dot === 100);
    });
  });

  describe('#angleTo', function() {
    it('should return the radians between two vecs', function() {
      var angle = Vec2(10, 0).angleTo(Vec2(0, 10));
      ok(angle === Math.PI/2);
    });
  });

  describe('#divide', function() {
    it('applies the result to itself if returnNew is falsy', function() {
      var v = new Vec2(10, 20);
      v.divide(10);
      ok(v.x === 1);
      ok(v.y === 2);
    });

    it('returns a new vector when returnNew is truthy', function() {
      var v = new Vec2(10, 20);
      var v2 = v.divide(10, true);
      ok(v.x === 10);
      ok(v.y === 20);

      ok(v2.x === 1);
      ok(v2.y === 2);
    });

    it('should throw when 0 is passed', function() {
      var err = false;
      throws(function() {
        Vec2().divide(0);
      });
    });

    it('should throw when NaN is passed', function() {
      var err = false;
      throws(function() {
        Vec2().divide(1/'a');
      });
    });

    it('should accept a vec', function() {
      var res = Vec2(10, 20).divide(Vec2(10, 4));

      ok(Vec2(1, 5).equal(res));
    });

    it('supports passing x,y', function() {
      var v = new Vec2(10, 20);
      ok(v.divide(10,2) === v);
      ok(v.equal(1, 10));
    });

    it('supports passing x,y (returnNew)', function() {
      var v = new Vec2(10, 20);
      var v2 = v.divide(10, 2, true)
      ok(v2 !== v);
      ok(v2.equal(1, 10));
    });

    it('supports passing [x,y]', function() {
      var v = new Vec2(10, 20);
      ok(v.divide([10, 2]) === v);
      ok(v.equal(1, 10));
    });

    it('supports passing [x,y] (returnNew)', function() {
      var v = new Vec2(10, 20);
      var v2 = v.divide([10, 2], true)
      ok(v2 !== v);
      ok(v2.equal(1, 10));
    });
  });

  describe('inheritance', function() {
    it('should use this.constructor when creating new instances', function() {
      var v = new Vec2Extended(10, 10);

      [
        v.clone(),
        v.subtract(Vec2(), true),
        v.add(Vec2(), true),
        v.multiply(Vec2(), true),
        v.divide(1, true),
        v.negate(true),
        v.rotate(.1, false, true),
        v.normalize(true),
        v.abs(true),
        v.min(Vec2(), true),
        v.max(Vec2(), true),
        v.clamp(Vec2(), Vec2(), true),
        v.skew(),
        Vec2.fromArray([0, 1], Vec2Extended),
      ].map(function(vec) {
        ok(vec instanceof Vec2Extended);
      });

    });
  });

  describe('#isPointOnLine', function() {
    it('should return true when on the specified line', function() {
      ok(Vec2(0, 0).isPointOnLine(Vec2(1, 1), Vec2(-1, -1)));
    });

    it('should return false when not on the specified line', function() {
      ok(!Vec2(0, 0).isPointOnLine(Vec2(1, 1), Vec2(-4, -1)));
    });
  });

  describe('#toArray', function() {
    it('should return a 2 item array', function() {
      var a = Vec2(1,2).toArray();
      ok(a[0] === 1);
      ok(a[1] === 2);
    });
  });

  describe('#fromArray', function() {
    it('should accept a 2 item array', function() {
      var v = Vec2().fromArray([1,2]);
      ok(v.x === 1);
      ok(v.y === 2);
    });
    it('should be a class member as well', function() {
      var v = Vec2.fromArray([1,2]);
      ok(v.x === 1);
      ok(v.y === 2);
    });
  });

  describe('#clean', function() {
    it('should clean the well known .1 + .2 case', function() {
      ok(Vec2.clean(0.1 + 0.2) === 0.3);
    });

    it('should throw when passed NaN', function() {
      var caught;
      throws(function() {
        Vec2.clean(parseInt('bla', 10));
      });

    });

    it('should throw when passed Infinity', function() {
      throws(function() {
        Vec2.clean(1/0);
      });
    });
  });

  describe('#toJSON', function () {
    it('should stringify nicely', function () {
      var v = new Vec2(3.5421, 0.234);
      ok(JSON.stringify(v) === '{"x":3.5421,"y":0.234}');
    });
  });

  describe('#toString', function() {
    it('should provide an easy to read representation', function() {
      var v = new Vec2(10, 100);
      ok((v + '') === '(10, 100)');
    });
  });

  describe('#fast', function() {
    it('it should not clean', function() {
      var Vec2Fast = Vec2.fast;
      var v = Vec2Fast(0.1, 0.2).add(Vec2Fast(0.2, 0.1));
      ok(v.x === 0.30000000000000004);
      ok(v.y === 0.30000000000000004);
    });
  });
});
