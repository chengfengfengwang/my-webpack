const fs = require('fs');
const babylon = require('babylon');
const {transformFromAst} = require('babel-core')
const traverse = require('babel-traverse').default;

const content = fs.readFileSync('./src/index.js', 'utf-8');
const ast = babylon.parse(content, {
  sourceType: 'module'
})
function getDependence (ast) {
  let dependencies = [];
  // 遍历ast找到所有import xx from 'value' 里的value
  traverse(ast, {
    ImportDeclaration: ({node}) => {
      dependencies.push(node.source.value);
    },
  })
  return dependencies
}
console.log(getDependence(ast))