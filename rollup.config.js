import commonjs from '@rollup/plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve'
import json from '@rollup/plugin-json'
export default {
  input: './index.js',
  output: {
    file: 'dist/index.common.js',
    format: 'cjs',
    banner: '/*Created by 01414993 */',
  },
  plugins: [
      json(),
      resolve({
        preferBuiltins: true,
      }),
      commonjs(),
  ]
}
