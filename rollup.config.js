import commonjs from 'rollup-plugin-commonjs'
import { uglify }from 'rollup-plugin-uglify'
export default {
  input: './index.js',
  output: {
    file: 'dist/index.common.js',
    format: 'cjs',
    banner: '/*Created by 01414993 */',
    sourcemap: 'inline',
  },
  plugins: [
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
      }
    }),
  ]
}
