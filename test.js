describe('Vec2', function() {
  describe('constructor', function() {
    it('should set x and y if they are passed', function() {
      var v = new box2d.Vec2(5, 6);
      ok(v.x === 5);
      ok(v.y === 6);
    });

    it('should default x and y to zero if not passed', function() {
      var v = new box2d.Vec2();
      ok(v.x === 0);
      ok(v.y === 0);
    })
  });

  describe('#set', function() {
    // TODO: mark dirty for other calcs
    it('should set x and y', function() {
      var v = new box2d.Vec2();
      v.set(10, 9);
      ok(v.x === 10);
      ok(v.y === 9);
    });

    it('should return itself', function() {
      var v = new box2d.Vec2();
      ok(v.set(1,2) === v);
    });
  });

  describe('#zero', function() {
    it('should set x and y to 0', function() {
      var v = new box2d.Vec2(1, 2);
      v.zero();
      ok(v.x === 0);
      ok(v.y === 0);
    });

    it('should return itself', function() {
      var v = new box2d.Vec2();
      ok(v.zero() === v);
    });
  });

  describe('#negate', function() {
    it('should make positive values negative', function() {
      var
      v = new box2d.Vec2(2, 2),
      v2 = v.negate();

      ok(v2.x === -2);
      ok(v2.y === -2);
    });

    it('should make negative values positive', function() {
      var
      v = new box2d.Vec2(-2, -2),
      v2 = v.negate();

      ok(v2.x === 2);
      ok(v2.y === 2);
    });

    it('should return itself when returnNew is falsy', function() {
      var v = new box2d.Vec2(1,1);
      ok(v.negate() === v);
    });

    it('should return a new Vec2 when returnNew is truthy', function() {
      var v = new box2d.Vec2(1,1);
      ok(v.negate(true) !== v);
    });
  });

  describe('math', function() {
    var v, v2;

    beforeEach(function() {
      v = new box2d.Vec2(1,2);
      v2 = new box2d.Vec2(10, 10);
    });

    describe('#add', function() {
      it('should add to both x and y', function() {
        v.add(v2);
        ok(v.x === 11);
        ok(v.y === 12);
      });

      it('should return a new vector when true is passed', function() {
        var r = v.add(v2, true)
        ok(v.x === 1);
        ok(v.y === 2);

        ok(r.x === 11);
        ok(r.y === 12);
      });

      it('should return this when returnNew is false', function() {
        var r = v.add(v2);
        ok(v.x === 11);
        ok(v.y === 12);
        ok(r === v);
      })
    });

    describe('#subtract', function() {
      it('should subtract from both x and y', function() {
        v.subtract(v2);
        ok(v.x === -9);
        ok(v.y === -8);
      });

      it('should return a new vector when true is passed', function() {
        var r = v.subtract(v2, true)
        ok(v.x === 1);
        ok(v.y === 2);

        ok(r.x === -9);
        ok(r.y === -8);
      });

      it('should return itself when returnNew is false', function() {
        var v = new box2d.Vec2(1,2);
        ok(v.subtract(new box2d.Vec2(1,1)) === v);
      });
    });

    describe('#multiply', function() {
      it('should multiply both x and y', function() {
        v.multiply(v2);
        ok(v.x === 10);
        ok(v.y === 20);
      });

      it('should return a new vector when true is passed', function() {
        var r = v.multiply(v2, true)
        ok(v.x === 1);
        ok(v.y === 2);

        ok(r.x === 10);
        ok(r.y === 20);
      });

      it('should accept a scalar', function() {
        var v = new box2d.Vec2(1,2);

        v.multiply(5);

        ok(v.x === 5);
        ok(v.y === 10);
      });

      it('should return a new Vec2 when returnNew is true', function() {
        var
        v = new box2d.Vec2(1,2),
        r = v.multiply(5, true);

        ok(r.x === 5);
        ok(r.y === 10);

        ok(v.x === 1);
        ok(v.y === 2);
      });

      it('should return itself when returnNew is false', function() {
        var v = new box2d.Vec2(1,2);
        ok(v.multiply(1) === v);
      });
    });

    describe('#rotate', function() {
      it('should rotate the vector by a Rotation', function() {
        var
        r = new box2d.Rotation(1.2),
        v = new box2d.Vec2(10, 20);

        ok(v.rotate(r, false, true).equal(
          -15.017204174577788,
          16.567545949205734
        ));
      });

      it('should inverse rotate the vector if specified', function() {
        var
        t = new box2d.Rotation(1.2),
        v = new box2d.Vec2(10, 20);

        ok(v.rotate(t, true, true).equal(
          22.26435926411126,
          -2.0732357701387896
        ));
      });

      it('should accept a scalar angle in radians', function() {
        var v = new box2d.Vec2(10, 20);

        ok(v.rotate(1.2, false, true).equal(
          -15.017204174577788,
          16.567545949205734
        ));
      });

      it('should accept a scalar angle in radians (inverse)', function() {
        var v = new box2d.Vec2(10, 20);

        ok(v.rotate(1.2, true, true).equal(
          22.26435926411126,
          -2.0732357701387896
        ));
      });

      it('should return a new vector if returnNew is truthy', function() {
        var v = new box2d.Vec2(10, 20);
        ok(v.rotate(1.0, false, true) !== v);
      });

      it('should return itself when returnNew is falsy', function() {
        var v = new box2d.Vec2(10, 20);
        ok(v.rotate(1.0, true) === v);
      });
    });

    describe('#length', function() {
      it('should calculate the length', function() {
        ok(v2.length() === 14.142135623730951);
      });

      it('should always be positive', function() {
        v2.subtract(new box2d.Vec2(100, 200));
        ok(v2.length() > 0);
      });
    });

    describe('#lengthSquared', function() {
      it('should square x and y, then sum them', function() {
        ok(v2.lengthSquared() === 200);
      });

      it('should always be positive', function() {
        v2.subtract(new box2d.Vec2(100, 200));
        ok(v2.length() > 0);
      });
    });

    describe('#distance', function() {
      it('should return a new Vec2', function() {
        var
        v = new box2d.Vec2(0, 10),
        v2 = new box2d.Vec2(0,0),
        d = v.distance(v2);

        ok(d === 10);
      });
    });

    describe('#distanceSquared', function() {
      it('should return a new Vec2', function() {
        var
        v = new box2d.Vec2(0, 10),
        v2 = new box2d.Vec2(0,0),
        d = v.distanceSquared(v2);

        ok(d === 100);
      });
    });

    describe('#normalize', function() {
      it('should properly normalize a vector', function() {
        v2.normalize();
        ok(v2.x = 0.7071067811865475);
        ok(v2.y = 0.7071067811865475);
      });
    });

    describe('#skew', function() {
      it('should negate the y axis and swap x/y', function() {
        var v3 = v.skew();
        ok(v.x === 1);
        ok(v.y === 2)
        ok(v3.x === -2);
        ok(v3.y === 1);
      });
    });

    describe('#abs', function() {
      it('should return a new vector with positive values', function() {
        var
        v = new box2d.Vec2(-10, -100),
        e = new box2d.Vec2(10, 100);

        ok(v.abs().equal(e));
      });
    });

    describe('#min', function() {
      it('should return a new Vec2 containing the smallest values when returnNew is truthy', function() {
        var
        v = new box2d.Vec2(-10, 100),
        v2 = new box2d.Vec2(10, -100),
        e = new box2d.Vec2(-10, -100);

        ok(e.min(v2, true).equal(e));
      });

      it('should apply the smallest values to itself when returnNew is falsy', function() {
        var
        v = new box2d.Vec2(-10, 100),
        v2 = new box2d.Vec2(10, -100),
        e = new box2d.Vec2(-10, -100);

        ok(e === e.min(v2));
      });
    });

    describe('#max', function() {
      it('should return a new Vec2 containing the largest values when returnNew is truthy', function() {
        var
        v = new box2d.Vec2(-10, 100),
        v2 = new box2d.Vec2(10, -100),
        e = new box2d.Vec2(10, 100);

        ok(e.max(v2, true).equal(e));
      });

      it('should apply the maximum values to itself if returnNew is falsy', function() {
        var
        v = new box2d.Vec2(-10, 100),
        v2 = new box2d.Vec2(10, -100),
        e = new box2d.Vec2(10, 100);

        ok(e === e.max(v2));
      });
    });
  });

  describe('#equal', function() {
    it('should return true when both Vec2s have the same values', function() {
      var
      v = new box2d.Vec2(1,2),
      v2 = new box2d.Vec2(1,2);

      ok(v.equal(v2));
    });

    it('should return false when the Vec2s have the different values', function() {
      var
      v = new box2d.Vec2(1,2),
      v2 = new box2d.Vec2(1,1);

      ok(!v.equal(v2));
    });

    it('should also operate on 2 scalars', function() {
      var v = new box2d.Vec2(1,2);
      ok(v.equal(1,2));
      ok(!v.equal(2,1));
    });
  });

  describe('clamp', function() {
    it('should be lowered to the upper bound if above', function() {
      var
      val = new box2d.Vec2(4, 6),
      low = new box2d.Vec2(0, 0),
      high = new box2d.Vec2(2, 4);

      ok(val.clamp(low, high).equal(2,4));
    });

    it('should be raised to the lowerbound if below', function() {
      var
      val = new box2d.Vec2(-2, -10),
      low = new box2d.Vec2(0, 0),
      high = new box2d.Vec2(2, 4);

      ok(val.clamp(low, high).equal(0,0));
    });

    it('should apply the result to itself if returnNew is false', function() {
      var
      val = new box2d.Vec2(4, 6),
      low = new box2d.Vec2(0, 0),
      high = new box2d.Vec2(2, 4);

      ok(val.clamp(low, high) === val);
    });

    it('should return a new Vec2 if returnNew is truthy', function() {
      var
      val = new box2d.Vec2(4, 6),
      low = new box2d.Vec2(0, 0),
      high = new box2d.Vec2(2, 4);

      ok(val.clamp(low, high, true) !== val);
    });
  })

  describe('#isValid', function() {
    it('should return false when NaN', function() {
      var v = new box2d.Vec2();
      v.x = parseInt('a', 10);
      v.y = 0;

      ok(!v.isValid());
    });

    it('should return false when Infinity', function() {
      var v = new box2d.Vec2(0, 1/0);
      ok(!v.isValid());
    });

    it('should return true when finite', function() {
      var v = new box2d.Vec2(-100, 0);
      ok(v.isValid());
    });
  });
});
