'./src/index.js': function (require, module, exports) { "use strict";

var _math = require("./math.js");

console.log((0, _math.add)(2, 3)); },


'./math.js': function (require, module, exports) { "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.randomTen = exports.add = undefined;

var _random = require("./random.js");

var add = exports.add = function add(a, b) {
  return a + b;
};
var randomTen = exports.randomTen = function randomTen() {
  return (0, _random.rangeRandom)(0, 10);
}; },



'./random.js': function (require, module, exports) { "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var rangeRandom = exports.rangeRandom = function rangeRandom(a, b) {
  return Math.floor(Math.random() * (b - a)) + a;
}; },