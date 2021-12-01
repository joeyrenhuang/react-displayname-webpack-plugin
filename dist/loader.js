const autoopen  = require('./autoopen') 
const editdn = require('./editdn')
const editdnstr = `
  ;(${editdn.toString()})()
`
const autoopenstr = `
  ;(${autoopen.toString()})()
`
let autoopencount = 0
module.exports = function apply(resource) {
  if (resource.indexOf('module.exports') !== -1) {
    return resource
  }
  let userRequest = this.resourcePath
  let id = userRequest.indexOf('node_modules') !== -1 ? 
    userRequest.substr(userRequest.indexOf('node_modules'))
    : userRequest.indexOf('src') !== -1 ? 
    userRequest.substr(userRequest.indexOf('src'))
    : userRequest
  let pos = id.startsWith('node_modules') ? {} : getAllPosition(resource)
  let appendstr = (editdnstr + (!autoopencount ? autoopenstr : '')).replace(/{{id}}/mg, id).replace('{{pos}}', JSON.stringify(pos))
  autoopencount++
  return resource + appendstr
}
const reg = /(\w+)(?:\s*=\s*(?:\([^()]*\)|\w+)\s*=>)|(?:(?:function|class)\s*)(\w+)/
function getAllPosition(q, x = {}, r = 1) {
  let {0: all, 1: fn, 2: name, index} = q.match(reg) || []
  name = name || fn
  const {rightContext, leftContext} = RegExp
  if (name) {
    let L = all.length
    let l = name.length
    r += (leftContext.match(/\n/g) || []).length
    x[name] = r + ':' + ((index + (fn ? 0 : L - l)) - leftContext.lastIndexOf('\n'))
    getAllPosition(rightContext, x, r)
  }
  return x
}
