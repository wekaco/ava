const path = require('path');

module.exports = {
  stories: [ '../src/**/*.stories.[tj]s'],
  webpackFinal: async (config, { configTYpe }) => {
    config.module.rules.unshift({
        test: /\.riot$/,
        exclude: /node_modules/,
        use: [{
          loader: '@riotjs/webpack-loader',
          options: {
            hot: false, // set it to true if you are using hmr
            // add here all the other @riotjs/compiler options riot.js.org/compiler
            // template: 'pug' for example
          }
        }]
    });
    return config;
  }
};
