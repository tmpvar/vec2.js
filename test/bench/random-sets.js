

var Vec2 = require('../../')
var max = 1000000
var l = max

var v = new Vec2(Math.random(), Math.random())
var start = Date.now()
while(l --)
  v.set(Math.random(), Math.random())

var end = Date.now()
console.log('  random sets. ops/s', (max/(end - start))*1000)
