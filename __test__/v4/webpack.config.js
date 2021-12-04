module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'source-map',
  devServer: {
    open: true,
  },
  plugins: [
    new (require('react-displayname-webpack-plugin'))(),
  ]
}
