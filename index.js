'use strict';
const path = require('path')
const { exec } = require('child_process')
let cmd = 'code'
exec('echo $EDITOR ', function(err, io, ioerr){
  if(io && io.trim()) cmd = io.trim()
})
const autoopen  = require('./autoopen') 
const editdn = require('./editdn')
const reg = /(?:export\s+(?:default)?\s*(?:function|let|const)?\s*)(\w+)/
const editdnstr = `
  ;(${editdn.toString()})()
`
let autoopencount = 0
const autoopenstr = `
  ;(${autoopen.toString()})()
`
function ReactDisplayNameWebpackPlugin(options) {
}
ReactDisplayNameWebpackPlugin.prototype.apply = function(c) {
  if (c.options.mode === 'development') {
    this.working(c)
    require('express')().get('/__open-in-editor', function(req, res){
      const [filename, search, origin] = req.query.file.split(':')
      exec(`${cmd} "${path.resolve(filename)} +/${origin || search}"`)
      res.sendStatus(200)
    }).listen(7666)
  }
}
ReactDisplayNameWebpackPlugin.prototype.working = function (c) {
  c.hooks.compilation.tap('ReactDisplayNameWebpackPlugin', (compilation, compilationParams) => {
    compilation.hooks.succeedModule.tap('ReactDisplayNameWebpackPlugin', (m) => {
      const {type, _source, userRequest} = m
      if (type === 'javascript/auto' && userRequest && userRequest.match(/\.jsx?$/) && (_source?._valueAsString || _source?._value)) {
        let id = userRequest.indexOf('node_modules') !== -1 ? 
          userRequest.substr(userRequest.indexOf('node_modules'))
          : userRequest.indexOf('src') !== -1 ? 
          userRequest.substr(userRequest.indexOf('src'))
          : userRequest
        let appendstr = (editdnstr + (!autoopencount ? autoopenstr : '')).replace(/{{id}}/mg, id)
        autoopencount++
        _source._valueAsString && (_source._valueAsString += appendstr)
        _source._value && (_source._value += appendstr)
      }
    })
  })
}

module.exports = ReactDisplayNameWebpackPlugin
