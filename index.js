const fs = require('fs');
const basePath = './src/';
function createGraph(path, graph = {}) {
  const content = fs.readFileSync(`${basePath}${path}`, 'utf-8');
  const reg = /require\(['"](.+)['"]\)/g;
  const matchAllResult = content.matchAll(reg);
  graph[path] = ` function(require, module, exports) {${content}}`;
  for (const match of matchAllResult) {
    graph = {...graph, ...createGraph(match[1])} 
  }
  return graph
}
function createModuleParam(graph) {
  let result = '';
  for (const key in graph) {
    if (Object.hasOwnProperty.call(graph, key)) {
      result += `'${key}': ${graph[key]},`
    }
  }
  return result
}
function createResult(moduleParam) {
  const result = `(function(modules){ // 接收一个模块对象
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
  })({${moduleParam}})`;
  fs.writeFileSync('./dist/index.js', result);
}


const graph = createGraph('index.js');
const moduleParam = createModuleParam(graph);
createResult(moduleParam)


