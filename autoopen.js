module.exports = function autoopen() {
  try {
    if (!window.__react_displayname_webpack_plugin_event) {
      let validFiber = (fiber, ifs = 'src', n = '') => {
        if (!fiber) return false
        if (fiber._debugOwner) {
          let type = fiber._debugOwner.type || ''
          let dn = type.displayName || type.name
          if(dn && dn.startsWith(ifs)) {
            console.log('trying open file ' + dn)
            fetch('http://localhost:7666/__open-in-editor?file=' + dn + ':' + n, {
              mode: 'no-cors',
            })
            return true
          }
          if (!n) n = dn
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
  } catch(e) {}

}
