# image-size-loader

A webpack image loader with extra meta information for image.

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

## Getting Started

To begin, you'll need to install `image-size-loader`:

```console
$ npm install --save-dev @lesechos/image-size-loader
```

Or

```console
$ yarn add -D @lesechos/image-size-loader
```

Then add the loader to your `webpack` config. For example:

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(webp|gif|jpe?g|png|svg)$/,
        use: [
          {
            loader: '@lesechos/image-size-loader',
            options: {},
          },
        ],
      },
    ],
  },
};
```

## Import images

Import (or `require`) the target file(s) in one of the bundle's files:

```js
// bundle file
import image from './file.png';
```

That return an object with extra meta info:

```js
  // console.log(image);
  {
    bytes: 1234
    height: 50,
    orientation: 1,
    src: "/assets/images/file.png",
    type: "png",
    width: 150,
  }
```

## More options

More webpack config exemple on file-loader documentation

[Documentation: file-loaders](https://github.com/webpack-contrib/file-loader/blob/master/README.md)
