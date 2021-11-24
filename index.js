'use strict';
const path = require('path')
const { exec } = require('child_process')
let cmd = 'code'
exec('echo $EDITOR ', function(err, io, ioerr){
  if(io && io.trim()) cmd = io.trim()
})
const displayName = `
 
  let __ReactDisplayNameWebpackPlugin__ = typeof __WEBPACK_DEFAULT_EXPORT__ === 'function'
    ? __WEBPACK_DEFAULT_EXPORT__ :
    typeof __webpack_exports__ !== 'undefined' && __webpack_exports__.default && typeof __webpack_exports__.default === 'function' && __webpack_exports__.default 
  
  !__ReactDisplayNameWebpackPlugin__  && (__ReactDisplayNameWebpackPlugin__ = typeof _default === 'function'
    ? _default :
    typeof exports !== 'undefined' && exports.default && typeof exports.default === 'function' && exports.default)

  __ReactDisplayNameWebpackPlugin__ && (__ReactDisplayNameWebpackPlugin__.displayName = '{{id}}')

  if (!window.__react_displayname_webpack_plugin_event) {
    let validFiber = (fiber, ifs = 'src') => {
      if (!fiber) return false
      if (fiber._debugOwner) {
        let type = fiber._debugOwner.type || ''
        let dn = type.displayName || type.name
        if(dn && dn.startsWith(ifs)) {
          console.log('11trying open file ' + dn)
          fetch('http://localhost:7666/__open-in-editor?file=' + dn, {
            mode: 'no-cors',
          })
          return true
        }
      } 
      return validFiber(fiber.return, ifs)
    }
    let fn = ({target}, ifs) => {
      if (target.tagName === 'HTML') return
      let key = Object.keys(target).find(x => x.match(/(__reactFiber|__reactInternalInstance)/))
      if (key && validFiber(target[key], ifs)) return true 
      console.log('couldn"t find file to open when travrse up the tree')
    }
    window.__react_displayname_webpack_plugin_event = fn
    
    /* click 3 time open src, 4 times open node_modules, 5times enter other mode: click 1 time to src, then reset*/
    let n = 0
    let t = 0
    let st = () => {
      return setTimeout(() => {
        n = 0
      }, 600) 
    }
    let handler = (evt) => {
      clearTimeout(t)
      t = st()
      n++
      if (n === 5) {
        clearTimeout(t)
        n = 2
      }
      if ( n === 4) {
        setTimeout(() => {
          n === 4 && fn(evt, 'node_modules')
        }, 300)
      }
      if ( n === 3 ) {
        setTimeout(() => {
          n === 3 && fn(evt)
        }, 300)
      }
    }
    window.addEventListener('mousedown', handler)
  }
`
function ReactDisplayNameWebpackPlugin(options) {
}
ReactDisplayNameWebpackPlugin.prototype.apply = function(c) {
  if (c.options.mode === 'development') {
    this.working(c)
    require('express')().get('/__open-in-editor', function(req, res){
      exec(`${cmd} ${path.resolve(req.query.file)}`)
      res.sendStatus(200)
    }).listen(7666)
  }
}
ReactDisplayNameWebpackPlugin.prototype.working = function (c) {
  c.hooks.compilation.tap('ReactDisplayNameWebpackPlugin', (compilation, compilationParams) => {
    compilation.hooks.succeedModule.tap('ReactDisplayNameWebpackPlugin', (m) => {
      const {type, _source, userRequest} = m
      if (type === 'javascript/auto' && userRequest && userRequest.match(/jsx?$/) && (_source?._valueAsString || _source?._value)) {
        let id = userRequest.indexOf('node_modules') !== -1 ? 
          userRequest.substr(userRequest.indexOf('node_modules'))
          : userRequest.indexOf('src') !== -1 ? 
          userRequest.substr(userRequest.indexOf('src'))
          : userRequest
        let appendstr = displayName.replace(/{{id}}/mg, id)
        _source._valueAsString && (_source._valueAsString += appendstr)
        _source._value && (_source._value += appendstr)
      }
    })
  })
}

module.exports = ReactDisplayNameWebpackPlugin
