module.exports = function editdn() {
  let __ReactDisplayNameWebpackPlugin__ = null
  try { __ReactDisplayNameWebpackPlugin__  = __webpack_exports__ } catch(e) {/*console.log('__WEBPACK_DEFAULT_EXPORT__ is undefined, your webpack version is lower than v5.0')*/}
  try { __ReactDisplayNameWebpackPlugin__  = exports } catch(e) {/*console.log('exports is undefined, your webpack version is higher or equal v5.0')*/}
  if (__ReactDisplayNameWebpackPlugin__) {
    let pos = JSON.parse('{{pos}}')
    Object.keys && Object.keys(pos).forEach(x => {
      try {
        eval(`${x}.displayName = '{{id}}:${x}'`)
        eval(`${x}.pos = pos`)
      } catch (e){}
    })
    Object.entries && Object.entries(__ReactDisplayNameWebpackPlugin__).forEach(([k, x]) => {
      if (!x || x.name === 'noop') {
        return
      }
      if (typeof x === 'function') {
        x.displayName = `{{id}}:${k}`
        x.pos = pos
      }
    })
  }
}
