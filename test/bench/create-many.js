var Vec2 = require('../../')
var max = 100000
var l = max

var start = Date.now()
while(l --) {
  var v = new Vec2(Math.random(), Math.random())
  v.set(Math.random(), Math.random())
}

var end = Date.now()
console.log('  random sets. ops/s', (max/(end - start))*1000)

