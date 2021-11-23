import commonjs from '@rollup/plugin-commonjs';
import {
   nodeResolve
} from '@rollup/plugin-node-resolve';
import globals from 'rollup-plugin-node-globals';
import builtins from 'rollup-plugin-node-builtins';
export default {
  input: './index.js',
  output: {
    file: 'dist/index.common.js',
    format: 'cjs',
    banner: '/*Created by 01414993 */',
    sourcemap: 'inline',
  },
  external: ['fs'], // tells Rollup 'I know what I'm doing here'
  plugins: [
      nodeResolve({
         preferBuiltins: true
      }), // or `true`
      commonjs(),
      globals(),
      builtins()
  ]
}
