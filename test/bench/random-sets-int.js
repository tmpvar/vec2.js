

var Vec2 = require('../../')
var max = 1000000
var l = max

var v = new Vec2(Math.random(), Math.random())
var start = Date.now()
function randomInt() {
  return Math.round(Math.random() * 23452345)
}

while(l --)
  v.set(randomInt(), randomInt())

var end = Date.now()
console.log('  random sets. ops/s', (max/(end - start))*1000)
