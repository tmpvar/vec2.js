
var Vec2 = require('../../')
var max = 1000000
var l = max

var a = new Vec2(Math.random(), Math.random())
var b = new Vec2(0, 0)

a.change(function () {
  b.set(a.x + 10, a.y + 10)
})
var start = Date.now()
while(l --) {
  a.set(Math.random(), Math.random())
}
var end = Date.now()
console.log('  observer ops/s', (max/(end - start))*1000)

