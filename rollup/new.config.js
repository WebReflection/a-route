import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import {terser} from 'rollup-plugin-terser';

export default {
  input: './esm/index.js',
  plugins: [
    resolve(),
    commonjs(),
    terser()
  ],
  output: {
    exports: 'named',
    file: './new.js',
    format: 'iife',
    name: 'ARoute'
  }
};
