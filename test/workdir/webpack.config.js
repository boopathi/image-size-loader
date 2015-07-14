var path = require('path');
var loader = path.join(__dirname, '..', '..', 'index.js');

module.exports = {
  entry: path.join(__dirname, 'index.js'),
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
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
