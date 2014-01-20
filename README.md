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

### Supported operations

 * set
 * zero
 * negate
 * add
 * subtract
 * multiply
 * rotate
 * length
 * lengthSquared
 * distance
 * normalize
 * equal
 * abs
 * min
 * max
 * clamp
 * isValid
 * skew
 * dot
 * perpDot
 * angleTo
 * divide
 * isPointOnLine(vec1, vec2)
 * toArray
 * fromArray

**Stuff to Note**: most of the Vec2's methods take a `returnNew` as the last parameter.  If passed a truthy value, a new vector will be returned to you.  Otherwise the operation will be applied to `this` and `this` will be returned.

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