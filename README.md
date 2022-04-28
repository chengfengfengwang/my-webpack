# 实现简单的webpack打包器

# 目标
我们的目标是把模块化的源码，打包成浏览器可以执行的代码
## 源码：
```
// index.js 入口文件
let a = require('a.js');
let b = require('b.js');
let c = require('c.js');
// a.js
module.exports = function () {
    console.log('a')
};
// b.js
module.exports = function () {
    console.log('b')
};
// c.js
module.exports = function () {
    console.log('c')
};
```
## 打包后的文件
```
// bundle.js // 可以直接在浏览器执行
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
})({
  'index.js': function(require, module, exports) {
    let a = require('a.js');
    let b = require('b.js');
    let c = require('c.js');
    a();
    b();
    c();
  },
  'a.js': function(require, module, exports) {
    module.exports = function () { // 里面的内容是a.js的源码
        console.log('a')
    };
  },
  'b.js': function(require, module, exports) {
    module.exports = function () { // 里面的内容是b.js的源码
        console.log('b')
    };
  },
  'c.js': function(require, module, exports) {
    module.exports = function () { // 里面的内容是c.js的源码
        console.log('c')
    };
  },
})
```
## 分析输出文件bundle.js
1. require函数
我们实现了require函数，详细注解看上面的代码注释
2. 参数部分
参数部分是对源码文件的映射。可以看到传参的modules对象只是把源码包裹了一层函数，函数里注入了require, module, exports三个参数
```
  function(require, module, exports) {
    ...源码
  }
```
如果能看懂bundle.js的结构以及怎么执行的话，我们就有了下一个阶段的目标：
找出所有的require源码，组织成如下结构
```
{
  'a.js': function(require, module, exports) {/*源码a.js*/},
  'b.js': function(require, module, exports) {/*源码b.js*/}
}
```

# 拼接入口和依赖模块