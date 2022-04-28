(function(modules){ // 接收一个模块对象
    // 实现require函数
    // require函数需要具备两个功能：
    // 1. require('a.js')时要执行a.js
    // 2. const a = require('a.js')时需要把a.js里的导出内容返回出来
    function require(path) {
      var fn = modules[path]; // 根据路径找到源码
      var module = {
        exports: {}
      };
      fn(require, module, module.exports); // 功能1:执行源码
      return module.exports // 功能2:返回模块导出内容
    };
    // 执行入口文件
    require('index.js')
  })({'index.js':  function(require, module, exports) {let a = require('a.js');
let b = require('b.js');
let c = require('c.js');

a();
b();
c();
},'a.js':  function(require, module, exports) {module.exports = function () {
  console.log('a')
};},'b.js':  function(require, module, exports) {module.exports = function () {
  console.log('b')
};},'c.js':  function(require, module, exports) {let d = require('hello.js');
var result = d.hello('world');

module.exports = function () {
  console.log(result)
};},'hello.js':  function(require, module, exports) {function hello (name) {
  return `hello ${name}`
}
module.exports = {
  hello: hello
}},})