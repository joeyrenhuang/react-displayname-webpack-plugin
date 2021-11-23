const Webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const wpcfg = {
  mode: 'development',
  entry: './index.f.js',
}
const compiler = Webpack(wpcfg)
const dscfg = {
    port: 7666,
    onBeforeSetupMiddleware (devServer) {
      devServer.app.use('/__open-in-editor', (require('launch-editor-middleware'))())
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type',
    }
}
new WebpackDevServer(dscfg, compiler).start()
