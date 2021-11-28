module.exports = function autoopen() {
  if (!window.__react_displayname_webpack_plugin_event) {
    let fn = (fiber) => {
        if (!fiber) return false
        let dn = fiber._debugOwner.type.displayName
        if(dn && dn.startsWith('src')) {
          console.log('trying open file {{path}}' + dn)
          return fetch('http://localhost:7666/__open-in-editor?file=' + dn, {
            mode: 'no-cors',
          })
        }
      fn(fiber.return)
    }
    window.__react_displayname_webpack_plugin_event = fn
    let n = 0
    let t = 0
    let st = () => {
      return setTimeout(() => {
        n = 0
      }, 500) 
    }
    window.addEventListener('click', ({target}) => {
      clearTimeout(t)
      t = st()
      n++
      if ( n === 3) {
        if (target.tagName === 'HTML') return
        let key = Object.keys(target).find(x => x.match(/__reactFiber/))
        let obj = target[key]
        fn(obj)
      }
    })
  }
}
