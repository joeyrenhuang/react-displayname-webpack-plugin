/*Created by 01414993 */
'use strict';

var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var launchEditorMiddleware = require('launch-editor-middleware');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var webpack__default = /*#__PURE__*/_interopDefaultLegacy(webpack);
var webpackDevServer__default = /*#__PURE__*/_interopDefaultLegacy(webpackDevServer);
var launchEditorMiddleware__default = /*#__PURE__*/_interopDefaultLegacy(launchEditorMiddleware);

const wpcfg = {
  mode: 'development',
  entry: './index.f.js',
};
const compiler = webpack__default["default"](wpcfg);
const dscfg = {
    port: 7666,
    onBeforeSetupMiddleware (devServer) {
      devServer.app.use('/__open-in-editor', (launchEditorMiddleware__default["default"])());
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type',
    }
};
new webpackDevServer__default["default"](dscfg, compiler).start();

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
`;
function ReactDisplayNameWebpackPlugin(options) {
  this.options = options; 
  this.force = !!options;
  this.s = typeof options === 'string' ? options : '';
  this.n = typeof options === 'number' ? options : '';
}
ReactDisplayNameWebpackPlugin.prototype.apply = function(c) {
  this.path = c.context;
  if (c.options.mode === 'development') {
    this.working(c);
    
  }
};
ReactDisplayNameWebpackPlugin.prototype.working = function (c) {
  c.hooks.compilation.tap('ReactDisplayNameWebpackPlugin', (compilation, compilationParams) => {
    compilation.hooks.succeedModule.tap('ReactDisplayNameWebpackPlugin', (m) => {
      const {type, rawRequest, _source, userRequest} = m;
      if (type === 'javascript/auto' && userRequest && userRequest.match(/jsx?$/) && userRequest.indexOf('node_modules') === -1 
        && (_source?._valueAsString || _source?._value)) {
        let id = this.s && userRequest.indexOf(this.s) !== -1 && userRequest.substr(userRequest.indexOf(this.s));
        !id && this.n && (id = userRequest.split('/').slice(this.n * -1).join('/'));
        !id && (id = rawRequest || userRequest);
        let appendstr = displayName.replace(/{{id}}/mg, id).replace(/{{force}}/mg, this.force).replace(/{{path}}/mg, this.path);
        _source._valueAsString && (_source._valueAsString += appendstr);
        _source._value && (_source._value += appendstr);
      }
    });
  });
};

var reactDisplaynameWebpackPlugin = ReactDisplayNameWebpackPlugin;

module.exports = reactDisplaynameWebpackPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguY29tbW9uLmpzIiwic291cmNlcyI6WyIuLi9kZXZTZXJ2ZXIuanMiLCIuLi9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBXZWJwYWNrID0gcmVxdWlyZSgnd2VicGFjaycpXG5jb25zdCBXZWJwYWNrRGV2U2VydmVyID0gcmVxdWlyZSgnd2VicGFjay1kZXYtc2VydmVyJylcbmNvbnN0IHdwY2ZnID0ge1xuICBtb2RlOiAnZGV2ZWxvcG1lbnQnLFxuICBlbnRyeTogJy4vaW5kZXguZi5qcycsXG59XG5jb25zdCBjb21waWxlciA9IFdlYnBhY2sod3BjZmcpXG5jb25zdCBkc2NmZyA9IHtcbiAgICBwb3J0OiA3NjY2LFxuICAgIG9uQmVmb3JlU2V0dXBNaWRkbGV3YXJlIChkZXZTZXJ2ZXIpIHtcbiAgICAgIGRldlNlcnZlci5hcHAudXNlKCcvX19vcGVuLWluLWVkaXRvcicsIChyZXF1aXJlKCdsYXVuY2gtZWRpdG9yLW1pZGRsZXdhcmUnKSkoKSlcbiAgICB9LFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiAnKicsXG4gICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kcyc6ICdHRVQsIFBPU1QsIE9QVElPTlMnLFxuICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnMnOiAnWC1SZXF1ZXN0ZWQtV2l0aCwgY29udGVudC10eXBlJyxcbiAgICB9XG59XG5uZXcgV2VicGFja0RldlNlcnZlcihkc2NmZywgY29tcGlsZXIpLnN0YXJ0KClcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IGRpc3BsYXlOYW1lID0gYFxuIFxuICBsZXQgX19SZWFjdERpc3BsYXlOYW1lV2VicGFja1BsdWdpbl9fID0gdHlwZW9mIF9fV0VCUEFDS19ERUZBVUxUX0VYUE9SVF9fID09PSAnZnVuY3Rpb24nXG4gICAgPyBfX1dFQlBBQ0tfREVGQVVMVF9FWFBPUlRfXyA6XG4gICAgdHlwZW9mIF9fd2VicGFja19leHBvcnRzX18gIT09ICd1bmRlZmluZWQnICYmIF9fd2VicGFja19leHBvcnRzX18uZGVmYXVsdCAmJiB0eXBlb2YgX193ZWJwYWNrX2V4cG9ydHNfXy5kZWZhdWx0ID09PSAnZnVuY3Rpb24nICYmIF9fd2VicGFja19leHBvcnRzX18uZGVmYXVsdCBcbiAgXG4gICFfX1JlYWN0RGlzcGxheU5hbWVXZWJwYWNrUGx1Z2luX18gICYmIChfX1JlYWN0RGlzcGxheU5hbWVXZWJwYWNrUGx1Z2luX18gPSB0eXBlb2YgX2RlZmF1bHQgPT09ICdmdW5jdGlvbidcbiAgICA/IF9kZWZhdWx0IDpcbiAgICB0eXBlb2YgZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcgJiYgZXhwb3J0cy5kZWZhdWx0ICYmIHR5cGVvZiBleHBvcnRzLmRlZmF1bHQgPT09ICdmdW5jdGlvbicgJiYgZXhwb3J0cy5kZWZhdWx0KVxuXG4gIF9fUmVhY3REaXNwbGF5TmFtZVdlYnBhY2tQbHVnaW5fXyAmJiAoIV9fUmVhY3REaXNwbGF5TmFtZVdlYnBhY2tQbHVnaW5fXy5uYW1lIHx8IHt7Zm9yY2V9fSkgJiYgKF9fUmVhY3REaXNwbGF5TmFtZVdlYnBhY2tQbHVnaW5fXy5kaXNwbGF5TmFtZSA9ICd7e2lkfX0nKVxuXG4gIGlmICghd2luZG93Ll9fcmVhY3RfZGlzcGxheW5hbWVfd2VicGFja19wbHVnaW5fZXZlbnQpIHtcbiAgICBsZXQgZm4gPSAoe3RhcmdldH0pID0+IHtcbiAgICAgIGlmICh0YXJnZXQudGFnTmFtZSA9PT0gJ0hUTUwnKSByZXR1cm5cbiAgICAgIGxldCBrZXkgPSBPYmplY3Qua2V5cyh0YXJnZXQpLmZpbmQoeCA9PiB4Lm1hdGNoKC9fX3JlYWN0RmliZXIvKSlcbiAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgbGV0IGRuID0gdGFyZ2V0W2tleV0uX2RlYnVnT3duZXIudHlwZS5kaXNwbGF5TmFtZVxuICAgICAgICBpZihkbi5zdGFydHNXaXRoKCdzcmMnKSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCd0cnlpbmcgb3BlbiBmaWxlIHt7cGF0aH19JyArIGRuKVxuICAgICAgICAgIHJldHVybiBmZXRjaCgnaHR0cDovL2xvY2FsaG9zdDo3NjY2L19fb3Blbi1pbi1lZGl0b3I/ZmlsZT0nICsgZG4sIHtcbiAgICAgICAgICAgIG1vZGU6ICduby1jb3JzJyxcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmbih7dGFyZ2V0OiB0YXJnZXQucGFyZW50Tm9kZX0pXG4gICAgfVxuICAgIHdpbmRvdy5fX3JlYWN0X2Rpc3BsYXluYW1lX3dlYnBhY2tfcGx1Z2luX2V2ZW50ID0gZm5cbiAgICB3aW5kb3cuVlVFX0RFVlRPT0xTX0NPTkZJRyA9IHtcbiAgICAgIG9wZW5JbkVkaXRvckhvc3Q6ICdodHRwOi8vbG9jYWxob3N0Ojc2NjYnLFxuICAgIH1cblxuICAgIGxldCBuID0gMFxuICAgIGxldCB0ID0gMFxuICAgIGxldCBzdCA9ICgpID0+IHtcbiAgICAgIHJldHVybiBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgbiA9IDBcbiAgICAgIH0sIDUwMCkgXG4gICAgfVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldnQpID0+IHtcbiAgICAgIGNsZWFyVGltZW91dCh0KVxuICAgICAgdCA9IHN0KClcbiAgICAgIG4rK1xuICAgICAgaWYgKCBuID09PSAzKSBmbihldnQpXG4gICAgfSlcbiAgfVxuYFxuZnVuY3Rpb24gUmVhY3REaXNwbGF5TmFtZVdlYnBhY2tQbHVnaW4ob3B0aW9ucykge1xuICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIFxuICB0aGlzLmZvcmNlID0gISFvcHRpb25zXG4gIHRoaXMucyA9IHR5cGVvZiBvcHRpb25zID09PSAnc3RyaW5nJyA/IG9wdGlvbnMgOiAnJ1xuICB0aGlzLm4gPSB0eXBlb2Ygb3B0aW9ucyA9PT0gJ251bWJlcicgPyBvcHRpb25zIDogJydcbn1cblJlYWN0RGlzcGxheU5hbWVXZWJwYWNrUGx1Z2luLnByb3RvdHlwZS5hcHBseSA9IGZ1bmN0aW9uKGMpIHtcbiAgdGhpcy5wYXRoID0gYy5jb250ZXh0XG4gIGlmIChjLm9wdGlvbnMubW9kZSA9PT0gJ2RldmVsb3BtZW50Jykge1xuICAgIHRoaXMud29ya2luZyhjKVxuICAgIHJlcXVpcmUoJy4vZGV2U2VydmVyLmpzJylcbiAgfVxufVxuUmVhY3REaXNwbGF5TmFtZVdlYnBhY2tQbHVnaW4ucHJvdG90eXBlLndvcmtpbmcgPSBmdW5jdGlvbiAoYykge1xuICBjLmhvb2tzLmNvbXBpbGF0aW9uLnRhcCgnUmVhY3REaXNwbGF5TmFtZVdlYnBhY2tQbHVnaW4nLCAoY29tcGlsYXRpb24sIGNvbXBpbGF0aW9uUGFyYW1zKSA9PiB7XG4gICAgY29tcGlsYXRpb24uaG9va3Muc3VjY2VlZE1vZHVsZS50YXAoJ1JlYWN0RGlzcGxheU5hbWVXZWJwYWNrUGx1Z2luJywgKG0pID0+IHtcbiAgICAgIGNvbnN0IHt0eXBlLCByYXdSZXF1ZXN0LCBfc291cmNlLCB1c2VyUmVxdWVzdH0gPSBtXG4gICAgICBpZiAodHlwZSA9PT0gJ2phdmFzY3JpcHQvYXV0bycgJiYgdXNlclJlcXVlc3QgJiYgdXNlclJlcXVlc3QubWF0Y2goL2pzeD8kLykgJiYgdXNlclJlcXVlc3QuaW5kZXhPZignbm9kZV9tb2R1bGVzJykgPT09IC0xIFxuICAgICAgICAmJiAoX3NvdXJjZT8uX3ZhbHVlQXNTdHJpbmcgfHwgX3NvdXJjZT8uX3ZhbHVlKSkge1xuICAgICAgICBsZXQgaWQgPSB0aGlzLnMgJiYgdXNlclJlcXVlc3QuaW5kZXhPZih0aGlzLnMpICE9PSAtMSAmJiB1c2VyUmVxdWVzdC5zdWJzdHIodXNlclJlcXVlc3QuaW5kZXhPZih0aGlzLnMpKVxuICAgICAgICAhaWQgJiYgdGhpcy5uICYmIChpZCA9IHVzZXJSZXF1ZXN0LnNwbGl0KCcvJykuc2xpY2UodGhpcy5uICogLTEpLmpvaW4oJy8nKSlcbiAgICAgICAgIWlkICYmIChpZCA9IHJhd1JlcXVlc3QgfHwgdXNlclJlcXVlc3QpXG4gICAgICAgIGxldCBhcHBlbmRzdHIgPSBkaXNwbGF5TmFtZS5yZXBsYWNlKC97e2lkfX0vbWcsIGlkKS5yZXBsYWNlKC97e2ZvcmNlfX0vbWcsIHRoaXMuZm9yY2UpLnJlcGxhY2UoL3t7cGF0aH19L21nLCB0aGlzLnBhdGgpXG4gICAgICAgIF9zb3VyY2UuX3ZhbHVlQXNTdHJpbmcgJiYgKF9zb3VyY2UuX3ZhbHVlQXNTdHJpbmcgKz0gYXBwZW5kc3RyKVxuICAgICAgICBfc291cmNlLl92YWx1ZSAmJiAoX3NvdXJjZS5fdmFsdWUgKz0gYXBwZW5kc3RyKVxuICAgICAgfVxuICAgIH0pXG4gIH0pXG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3REaXNwbGF5TmFtZVdlYnBhY2tQbHVnaW5cbiJdLCJuYW1lcyI6WyJXZWJwYWNrIiwicmVxdWlyZSQkMCIsIldlYnBhY2tEZXZTZXJ2ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFFQSxNQUFNLEtBQUssR0FBRztBQUNkLEVBQUUsSUFBSSxFQUFFLGFBQWE7QUFDckIsRUFBRSxLQUFLLEVBQUUsY0FBYztBQUN2QixFQUFDO0FBQ0QsTUFBTSxRQUFRLEdBQUdBLDJCQUFPLENBQUMsS0FBSyxFQUFDO0FBQy9CLE1BQU0sS0FBSyxHQUFHO0FBQ2QsSUFBSSxJQUFJLEVBQUUsSUFBSTtBQUNkLElBQUksdUJBQXVCLENBQUMsQ0FBQyxTQUFTLEVBQUU7QUFDeEMsTUFBTSxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDQywwQ0FBbUMsR0FBRyxFQUFDO0FBQ3JGLEtBQUs7QUFDTCxJQUFJLE9BQU8sRUFBRTtBQUNiLE1BQU0sNkJBQTZCLEVBQUUsR0FBRztBQUN4QyxNQUFNLDhCQUE4QixFQUFFLG9CQUFvQjtBQUMxRCxNQUFNLDhCQUE4QixFQUFFLGdDQUFnQztBQUN0RSxLQUFLO0FBQ0wsRUFBQztBQUNELElBQUlDLG9DQUFnQixDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQyxLQUFLOztBQ2pCM0MsTUFB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
