import riot from 'rollup-plugin-riot';

import replace from '@rollup/plugin-replace';
import nodeResolve from 'rollup-plugin-node-resolve';

import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';

import commonjs from 'rollup-plugin-commonjs';

import { terser } from 'rollup-plugin-terser';

import copy from 'rollup-plugin-copy';

export default {
  input: 'src/app.js',
  output: [
    {
      file: 'www/js/app.js',
      format: 'iife',
      sourcemap: 'inline'
    },
    {
      file: 'www/js/app.min.js',
      format: 'iife'
    },
  ],
  plugins: [
    replace({ __SERVER_URL__: process.env.GRAPHQL_SERVER_URL || 'localhost:3000' }),
    copy({
      targets: [
        { src: 'index.html', dest: 'www/' },
        { src: 'css', dest: 'www/' }
      ]
    }),
    commonjs({
      namedExports: {
        'node_modules/subscriptions-transport-ws/dist/index.js': ['SubscriptionClient']
      }
    }),
    globals(),
    nodeResolve({ browser: true }),
    builtins(),
    riot({
      ext: 'riot'
    }),
    terser({
      include:  [/^.+\.min\.js$/]
    })
  ]
}
