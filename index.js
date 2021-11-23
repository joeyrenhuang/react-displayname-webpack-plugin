'use strict';
const displayName = `
 
  let __ReactDisplayNameWebpackPlugin__ = typeof __WEBPACK_DEFAULT_EXPORT__ === 'function'
    ? __WEBPACK_DEFAULT_EXPORT__ :
    typeof __webpack_exports__ !== 'undefined' && __webpack_exports__.default && typeof __webpack_exports__.default === 'function' && __webpack_exports__.default 
  
  !__ReactDisplayNameWebpackPlugin__  && (__ReactDisplayNameWebpackPlugin__ = typeof _default === 'function'
    ? _default :
    typeof exports !== 'undefined' && exports.default && typeof exports.default === 'function' && exports.default)

  __ReactDisplayNameWebpackPlugin__ && (!__ReactDisplayNameWebpackPlugin__.name || {{force}}) && (__ReactDisplayNameWebpackPlugin__.displayName = '{{id}}')

  if (!window.__react_displayname_webpack_plugin_event) {
    let fn = ({target}) => {
      if (target.tagName === 'HTML') return
      let key = Object.keys(target).find(x => x.match(/__reactFiber/))
      if (key) {
        let dn = target[key]._debugOwner.type.displayName
        if(dn.startsWith('src')) {
          console.log('trying open file {{path}}' + dn)
          return fetch('http://localhost:7666/__open-in-editor?file=' + dn, {
            mode: 'no-cors',
          })
        }
      }
      fn({target: target.parentNode})
    }
    window.__react_displayname_webpack_plugin_event = fn
    window.VUE_DEVTOOLS_CONFIG = {
      openInEditorHost: 'http://localhost:7666',
    }

    let n = 0
    let t = 0
    let st = () => {
      return setTimeout(() => {
        n = 0
      }, 500) 
    }
    window.addEventListener('click', (evt) => {
      clearTimeout(t)
      t = st()
      n++
      if ( n === 3) fn(evt)
    })
  }
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
