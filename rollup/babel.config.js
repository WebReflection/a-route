import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

export default {
  input: './esm/index.js',
  plugins: [
    resolve(),
    commonjs(),
    babel({presets: ['@babel/preset-env']})
  ],
  output: {
    exports: 'named',
    file: './index.js',
    format: 'iife',
    name: 'ARoute'
  }
};
