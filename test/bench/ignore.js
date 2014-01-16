
var Vec2 = require('../../')
var max = 1000000
var l = max

var a = new Vec2(Math.random(), Math.random())

var fns = []

Array(max).forEach(function() {
  var fn = function(){};
  fns.push(fn);
  a.change(fn);
});

var start = Date.now()
while(l --) {
  a.ignore(fns[l]);
}
var end = Date.now()
console.log('  observer ops/s', (max/(end - start))*1000)
