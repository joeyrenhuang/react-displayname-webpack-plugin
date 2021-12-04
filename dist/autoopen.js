module.exports = function autoopen() {
  try {
    if (!window.__react_displayname_webpack_plugin_event) {
      let validFiber = (fiber, ifs = 'src', n = '') => {
        if (!fiber) return false
        if (fiber._debugOwner) {
          let type = fiber._debugOwner.type || ''
          let dn = type.displayName || type.name
          let pos = type.pos || {}
          if(dn && dn.startsWith(ifs)) {
            dn = dn.split(':')[0]
            console.log('trying open file ' + dn)
            fetch('http://localhost:{{port}}/__open-in-editor?file=' + dn + ':' + (pos[n] || pos[type.name] || ''), {
              mode: 'no-cors',
            })
            return true
          }
          if (!n && dn && !dn.match(/node_modules|\//)) n = dn || ''
          if (dn && dn.match(/node_modules|\//)) n = ''
        } 
        return validFiber(fiber.return, ifs, n)
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
      let target = null
      let st = () => {
        return setTimeout(() => {
          n = 0
          target = null
        }, 1000) 
      }
      let handler = (evt) => {
        clearTimeout(t)
        t = st()
        if (!target) target = evt.target
        if (evt.target !== target) return
        n++
        if (n === 5) {
          clearTimeout(t)
          target = null
          n = 2
        }
        if ( n === 4) {
          setTimeout(() => {
            n === 4 && fn(evt, 'node_modules')
          }, 500)
        }
        if ( n === 3 ) {
          setTimeout(() => {
            n === 3 && fn(evt)
          }, 500)
        }
      }
      window.addEventListener('mousedown', handler)
    }
  } catch(e) {}

}
