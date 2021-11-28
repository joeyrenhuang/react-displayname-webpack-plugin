'use strict';
const autoopen  = require('./autoopen') 
const editdn = require('./editdn')
const reg = /(?:export\s+(?:default)?\s*(?:function|let|const)?\s*)(\w+)/
const displayName = `
  eval(${editdn.toString()}())
  eval(${autoopen.toString()}())
`
function ReactDisplayNameWebpackPlugin(options) {
  this.options = options 
  this.force = !!options
  this.s = typeof options === 'string' ? options : ''
  this.n = typeof options === 'number' ? options : ''
}
ReactDisplayNameWebpackPlugin.prototype.apply = function(c) {
  this.path = c.context
  if (c.options.mode === 'development') {
    this.working(c)
    require('./devServer.js')
  }
}
ReactDisplayNameWebpackPlugin.prototype.working = function (c) {
  c.hooks.compilation.tap('ReactDisplayNameWebpackPlugin', (compilation, compilationParams) => {
    compilation.hooks.succeedModule.tap('ReactDisplayNameWebpackPlugin', (m) => {
      const {type, rawRequest, _source, userRequest} = m
      if (type === 'javascript/auto' && userRequest && userRequest.match(/jsx?$/) && userRequest.indexOf('node_modules') === -1 
        && (_source?._valueAsString || _source?._value)) {
        let id = this.s && userRequest.indexOf(this.s) !== -1 && userRequest.substr(userRequest.indexOf(this.s))
        !id && this.n && (id = userRequest.split('/').slice(this.n * -1).join('/'))
        !id && (id = rawRequest || userRequest)
        let appendstr = displayName.replace(/{{id}}/mg, id).replace(/{{force}}/mg, this.force).replace(/{{path}}/mg, this.path)
        _source._valueAsString && (_source._valueAsString += appendstr)
        _source._value && (_source._value += appendstr)
      }
    })
  })
}

module.exports = ReactDisplayNameWebpackPlugin
