/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {


  ;(function editdn() {
  let __ReactDisplayNameWebpackPlugin__ = null
  try { __ReactDisplayNameWebpackPlugin__  = __webpack_exports__ } catch(e) {/*console.log('__WEBPACK_DEFAULT_EXPORT__ is undefined, your webpack version is lower than v5.0')*/}
  try { __ReactDisplayNameWebpackPlugin__  = exports } catch(e) {/*console.log('exports is undefined, your webpack version is higher or equal v5.0')*/}
  if (__ReactDisplayNameWebpackPlugin__) {
    let pos = JSON.parse('{}')
    Object.keys && Object.keys(pos).forEach(x => {
      try {
        eval(`${x}.displayName = 'src/index.js:${x}'`)
        eval(`${x}.pos = pos`)
      } catch (e){}
    })
    Object.values && Object.values(__ReactDisplayNameWebpackPlugin__).forEach(x => {
      if (typeof x === 'function') {
        x.displayName = `src/index.js:${x.name || 'default'}`
        x.pos = pos
      }
    })
  }
})()

  ;(function autoopen() {
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
            fetch('http://localhost:7876/__open-in-editor?file=' + dn + ':' + (pos[n] || pos[type.name] || ''), {
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

})()


/***/ })

/******/ });
//# sourceMappingURL=main.js.map