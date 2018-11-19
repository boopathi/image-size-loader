# image size loader for webpack

A webpack image loader with extra size info for image.

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

``` javascript
npm install image-size-loader --save

import image from 'file.png';
// => emits file.png to the output directory
// => returns an object
// => { width: 150, height: 50, type: "png", src: __webpack_public_path__ + "file.png", bytes: 1234 }
```

## Examples

#### webpack.config.js

```js
// webpack.config.js
module.exports = {
  output: {
    publicPath: '/public/'
  },
  module: {
    loaders: [
      {
        test: /\.(gif|jpeg|jpg|png|svg)$/,
        loader: 'image-size-loader'
      }
    ]
  }
};
```
