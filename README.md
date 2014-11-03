# Vec2.js

![travis](https://api.travis-ci.org/tmpvar/vec2.js.png)

[![browser support](https://ci.testling.com/tmpvar/vec2.js.png)](http://ci.testling.com/tmpvar/vec2.js)

  A generic library useful when you need to work with points/vectors in 2d space.

## Use

```javascript
  var a = new Vec2(10, 10), // new keyword
      b = Vec2(100, 10); // call the constructor directly

  console.log(a.distance(b)); // 90
```

**Stuff to Note**: most of the Vec2's methods take a `returnNew` as the last parameter.  If passed a truthy value, a new vector will be returned to you.  Otherwise the operation will be applied to `this` and `this` will be returned.

Also, since `Infinity`and `NaN` are so insidious, this library will throw as soon as it detects either of these so you can take action to fix your data/algorithm.


## Supported operations

__change__([fn])

Add an observer `fn` that will be called whenever this vector changes.  Calling this method without a function causes it to notify observers.

`fn` signature: `function(vec, prev) {}` - where `prev` is a clone of the vector before the last operation.

this function returns the passed `fn`

_returns_: `Vec2`

<hr />

__ignore__([fn])

Pass a `fn` to remove it from the observers list. Calling this function without a `fn` will remove all observers.

_returns_: `Vec2`

<hr />

__set__(x, y [, notify]) or __set__(vec2 [, notify])

Sets the `x` and `y` coordinates of this vector.  If `false` is passed for `notify`, none of the observers will be called.

_returns_: `Vec2`

<hr />

__zero__()

Sets the `x` and `y` of this vector to `0`

_returns_: `Vec2`

<hr />

__clone__()

Returns a clone of this vector.

_Note_: this does not clone observers

_returns_: `Vec2`

<hr />

__negate__([returnNew])

Negate the `x` and `y` coords of this vector.  If `returnNew` is truthy, a new vector with the negated coordinates will be returned.

_returns_: `Vec2`

<hr />

__add__(x, y [, returnNew]) or __add__(array, [, returnNew]) or __add__(vec2 [, returnNew])

Add the `x` and `y` to this vector's coordinates.

If `returnNew` is truthy, return a new vector containing the resulting coordinates. Otherwise apply them to this vector and return it.

_returns_: `Vec2`

<hr />

__subtract__(x, y [, returnNew]) or __subtract__(array, [, returnNew]) or __subtract__(vec2 [, returnNew])

_returns_: `Vec2`

<hr />

__multiply__(scalar [, returnNew]) or __multiply__(x, y [, returnNew]) or __multiply__(array, [, returnNew]) or __multiply__(vec2 [, returnNew])


Multiply this vectors components with the incoming, returning a clone if `returnNew` is truthy.

_returns_: `Vec2`

<hr />

__divide__(scalar [, returnNew]) or __divide__(x, y [, returnNew]) or __divide__(array, [, returnNew]) or __divide__(vec2 [, returnNew])


Divide this vectors components by the incoming, returning a clone if `returnNew` is truthy.

_note_: this method will throw if you attempt to divide by zero or pass values that cause NaNs

_returns_: `Vec2`

<hr />


__rotate__(radians [, inverse [, returnNew]])

Rotate this vector's cordinates around `(0,0)`.  If `returnNew` is specified, a new `Vec2` will be created and populated with the result and returned.  Otherwise the result is applied to this vector and `this` is returned.

`inverse` - inverts the direction of the rotation

`returnNew` - causes the result to be applied to a new `Vec2`, otherwise the result is applied to `this`

_returns_: `Vec2`

<hr />

__length__()

Returns the length of this vector from `(0,0)`

_returns_: `double`

<hr />

__lengthSquared__()

Returns the length of this vector prior to the `Math.sqrt` call.

This is usefull when you don't need to know the actual distance, but need a normalized value to compare with another `Vec2#lengthSquared` or similar.

_returns_: `double`

<hr />


__distance__(vec2)

_returns_: the distance between this vector and the incoming

<hr />

__nearest__(array)

_returns_: closest vector in array to this vector.

<hr />

__normalize__([returnNew])

Normalizes this vector.  If `returnNew` is truthy, a new vector populated with the normalized coordinates will be returned.

_returns_: `Vec2`

<hr />


__equal__(vec2) or __equal__(x, y) or __equal__(array)

returns true if the incoming coordinates are the same as this vector's

_returns_: `boolean`

__abs__([returnNew])

Return a `Vec2` that contains the absolute value of each of this vector's parts.

If `returnNew` is truthy, create a new `Vec2` and return it. Otherwise apply the absolute values to to `this`.

_returns_: `Vec2`

<hr />

__min__(vec)

Return a `Vec2` consisting of the smallest values from this vector and the incoming

When returnNew is truthy, a new `Vec2` will be returned otherwise the minimum values in either this or `vec` will be applied to this vector.

_returns_: `Vec2`

<hr />

__max__(vec)

Return a `Vec2` consisting of the largest values from this vector and the incoming

When returnNew is truthy, a new `Vec2` will be returned otherwise the maximum values in either `this` or `vec` will be applied to this vector.

_returns_: `Vec2`

<hr />

__clamp__(low, high [, returnNew])

Clamp the coordinates of this vector to the high/low of the incoming vec2s.  If `returnNew` apply the result to the new vector and return.  Otherwise apply to this vector.

_returns_: `Vec2`

<hr />

__lerp__(vec, amount [, returnNew])

Perform linear interpolation between this vector and the incoming.

`amount` - the percentage along the path to place the vector

`returnNew` - if `truthy`, apply the result to a new vector and return it, otherwise return `this`


_returns_: `Vec2`

<hr />

__skew__([returnNew])

Returns a vector set with the `(-y,x)` coordinates of this vector.  If `returnNew` a new vector is created and the operation is applied to the new vector.


_returns_: `Vec2`

<hr />

__dot__()

_returns_: `double`

<hr />

__perpDot__()

_returns_: `double`

<hr />

__angleTo__(vec)

returns the angle from this vector to the incoming.

_returns_: `double`

<hr />

__isPointOnLine__(start, end)

where `start` and `end` are vec2-like (e.g. `start.x` and `start.y`)

_returns_: `boolean`

<hr />

__toArray__()

_returns_: `[x, y]`

<hr />

__fromArray__(array)

Applies the `[0]` to `this.x` and `[1]` to `this.y`

_returns_: `Vec2`

<hr />

__toJSON__()

_returns_: `{ x: ..., y: ...}`

<hr />

__toString__()

_returns_: `'(x, y)'`

## Install

### Browser

```html
<script type="text/javascript" src="https://raw.github.com/tmpvar/vec2.js/master/vec2.min.js"></script>
<script type="text/javascript">
   var v = new Vec2();
</script>
```

### Node

install with npm

    npm install vec2

and then require it!

    var Vec2 = require('vec2');


## License

MIT (see [LICENSE.txt](LICENSE.txt))