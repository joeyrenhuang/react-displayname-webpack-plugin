'use strict';
const path = require('path')
const { exec, spawn } = require('child_process')
let cmd = 'code'
exec('printf $MYEDITOR,$EDITOR', function(err, io, ioerr){
  if(io) {
    const [my, editor] = io.split(',')
    cmd = my || editor 
  }
})
function ReactDisplayNameWebpackPlugin(options) {
  this.port = 7666 + Math.floor(Math.random() * 333)
}
ReactDisplayNameWebpackPlugin.prototype.apply = function(c) {
  if (c.options.mode === 'development') {
    this.working(c)
    require('express')().get('/__open-in-editor', function(req, res){
      let [filename, r = 0, c = 0] = req.query.file.split(':')
      r = r || 0
      c = c || 0
      if(cmd === 'code') {
        exec(`${cmd} -g ${path.resolve(filename)}:${r}:${c}`)
      } else if(cmd === 'nvi') {
        exec(`${cmd} "${path.resolve(filename)} '+call cursor(${r},${c})'"`)
      } else {
        spawn(cmd, [path.resolve(filename), `+call cursor(${r},${c})`], {stdio: 'inherit'})
      }
      res.sendStatus(200)
    }).listen(this.port)
  }
}
ReactDisplayNameWebpackPlugin.prototype.working = function (c) {
  c.hooks.compilation.tap('ReactDisplayNameWebpackPlugin', (compilation, compilationParams) => {

    compilation.hooks.buildModule.tap('ReactDisplayNameWebpackPlugin', (m) => {
      const {type, userRequest} = m
      if (type === 'javascript/auto' && userRequest && userRequest.match(/\.jsx?$/)) {
        m.loaders.push({
          loader: require.resolve('./loader'),
          options: {
            port: this.port
          }
        })
      }
    })

  })
}
const reg = /(?:export\s+(?:default)?\s*(?:function|let|const)?\s*)(\w+)/
function getAllPosition(q, x = {}, r = 0) {
  const {1: name, index} = q.match(reg) || []
  const {rightContext, leftContext} = RegExp
  if (name) {
    r += (leftContext.match(/\n/g) || []).length
    x[name] = r + ':' + (index - leftContext.lastIndexOf('\n'))
    getAllPosition(rightContext, x, r)
  }
  return x
}
module.exports = ReactDisplayNameWebpackPlugin
