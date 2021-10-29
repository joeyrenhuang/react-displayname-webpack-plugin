'use strict';
const displayName = `
 
  let __ReactDisplayNameWebpackPlugin__ = typeof __WEBPACK_DEFAULT_EXPORT__ === 'function'
    ? __WEBPACK_DEFAULT_EXPORT__ :
    typeof __webpack_exports__ !== 'undefined' && __webpack_exports__.default && typeof __webpack_exports__.default === 'function' && __webpack_exports__.default 
  
  !__ReactDisplayNameWebpackPlugin__  && (__ReactDisplayNameWebpackPlugin__ = typeof _default === 'function'
    ? _default :
    typeof exports !== 'undefined' && exports.default && typeof exports.default === 'function' && exports.default)

  __ReactDisplayNameWebpackPlugin__ && (!__ReactDisplayNameWebpackPlugin__.name || {{force}}) && (__ReactDisplayNameWebpackPlugin__.displayName = '{{id}}')
`
function ReactDisplayNameWebpackPlugin(options) {
  this.options = options 
  this.force = !!options
  this.s = typeof options === 'string' ? options : ''
  this.n = typeof options === 'number' ? options : ''
}
ReactDisplayNameWebpackPlugin.prototype.apply = function(c) {
  if (c.options.mode === 'development') {
    this.working(c)
  }
}
ReactDisplayNameWebpackPlugin.prototype.working = function (c) {
  c.hooks.compilation.tap('ReactDisplayNameWebpackPlugin', (compilation, compilationParams) => {
    compilation.hooks.succeedModule.tap('ReactDisplayNameWebpackPlugin', (m) => {
      const {type, rawRequest, _source, request, userRequest} = m
      if (type === 'javascript/auto' && (userRequest || request) && (userRequest || request).match(/jsx?$/) && (userRequest || request).indexOf('node_modules') === -1 
        && (_source?._valueAsString || _source?._value)) {
        userRequest = userRequest || request
        let id = this.s && userRequest.indexOf(this.s) !== -1 && userRequest.substr(userRequest.indexOf(this.s))
        !id && this.n && (id = userRequest.split('/').slice(this.n * -1).join('/'))
        !id && (id = rawRequest)
        let appendstr = displayName.replace(/{{id}}/mg, id).replace(/{{force}}/mg, this.force)
        _source._valueAsString && (_source._valueAsString += appendstr)
        _source._value && (_source._value += appendstr)
      }
    })
  })
}

module.exports = ReactDisplayNameWebpackPlugin
