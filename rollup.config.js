import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';
import json from 'rollup-plugin-json';

export default [
  // browser-friendly UMD build
  {
    input: 'src/unexpected-rxjs.js',
    output: {
      name: 'unexpectedRxjs',
      file: pkg.browser,
      format: 'umd',
      exports: 'auto',
    },
    plugins: [
      resolve(), // so Rollup can find `ms`
      commonjs(), // so Rollup can convert `ms` to an ES module
      json(),
      babel({
        exclude: ['node_modules/**'],
      }),
    ],
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: 'src/unexpected-rxjs.js',
    external: ['rxjs', 'rxjs/operators'],
    output: [
      {file: pkg.main, format: 'cjs', exports: 'auto'},
      {file: pkg.module, format: 'es'},
    ],
    plugins: [
      resolve(),
      json(),
      babel({
        exclude: ['node_modules/**'],
      }),
    ],
  },
];
