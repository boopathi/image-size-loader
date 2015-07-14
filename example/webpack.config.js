var path = require('path');
var loader = path.join(__dirname, '..', 'index.js');
var __DEV__ = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: path.join(__dirname, 'index.js'),
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: __DEV__ ? '/public/' : 'https://cdn.example.com/assets/'
  },
  module: {
    loaders: [
      {
        test: /\.png$/,
        loader: loader
      }
    ]
  }
};
