module.exports = function editdn() {
  /*
  let __ReactDisplayNameWebpackPlugin__ = typeof __WEBPACK_DEFAULT_EXPORT__ === 'function'
    ? __WEBPACK_DEFAULT_EXPORT__ :
    typeof __webpack_exports__ !== 'undefined' && __webpack_exports__.default && typeof __webpack_exports__.default === 'function' && __webpack_exports__.default 
  
  !__ReactDisplayNameWebpackPlugin__  && (__ReactDisplayNameWebpackPlugin__ = typeof _default === 'function'
    ? _default :
    typeof exports !== 'undefined' && exports.default && typeof exports.default === 'function' && exports.default)
  __ReactDisplayNameWebpackPlugin__ && (!__ReactDisplayNameWebpackPlugin__.name || {{force}}) && (__ReactDisplayNameWebpackPlugin__.displayName = '{{id}}')
  */

  let __ReactDisplayNameWebpackPlugin__ = null
  try { __ReactDisplayNameWebpackPlugin__  = __webpack_exports__ } catch(e) {console.log('__WEBPACK_DEFAULT_EXPORT__ is undefined, your webpack version is lower than v5.0')}
  try { __ReactDisplayNameWebpackPlugin__  = exports } catch(e) {console.log('exports is undefined, your webpack version is higher or equal v5.0')}
  if (__ReactDisplayNameWebpackPlugin__) {
    Object.values(__ReactDisplayNameWebpackPlugin__).forEach(x => {
      if (typeof x === 'function') {
        x.displayName = `{{id}}:${x.name || 'default'}`
      }
    })
  }
}
