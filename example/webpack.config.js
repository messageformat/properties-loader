const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.properties$/,
        loader: 'messageformat-properties-loader',
        options: {
          keyPath: true
        }
      }
    ]
  }
}
