module.exports = {
  output: {
    filename: 'my-first-webpack.bundle.js'
  },
  module: {
    rules: [
      { test: /\.riot\.[tj]s/, use: 'riot-tag-loader' }
    ]
  }
};
