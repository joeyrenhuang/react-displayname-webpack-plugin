'use strict';
const displayName = `
  if (typeof __WEBPACK_DEFAULT_EXPORT__ === 'function') {
    __WEBPACK_DEFAULT_EXPORT__.displayName = '{{id}}'
  } else if(typeof __webpack_exports__.default === 'function'){
    __webpack_exports__.default.displayName = '{{id}}'
  }
`
function ReactDisplayNameWebpackPlugin(options) {
  this.options = options 
}
ReactDisplayNameWebpackPlugin.prototype.apply = function(c) {
  if (c.options.mode === 'development') {
    this.working(c)
  }
}
ReactDisplayNameWebpackPlugin.prototype.working = function (c) {
  c.hooks.compilation.tap('ReactDisplayNameWebpackPlugin', function(compilation, compilationParams){
    compilation.hooks.succeedModule.tap('react-help-webpack-plugin', function({type, context, rawRequest, _source}) {
      if (type === 'javascript/auto' && context.indexOf('node_modules') === -1 && _source?._value) {
        _source._valueAsString = _source._value += displayName.replace(/{{id}}/mg, rawRequest)
      }
    })
  })
}

module.exports = ReactDisplayNameWebpackPlugin
