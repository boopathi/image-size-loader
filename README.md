# image size loader for webpack

A webpack image loader with extra size info for image.

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

``` javascript
npm install image-size-loader --save

var image = require("image-size!./file.png");
// => emits file.png to the output directory
// => returns an object
// => { width: 150, height: 50, type: "png", src: "file.png", bytes: 1234 }
```

## Options

### query params

#### name

```js
var image = require('image-size?name=[hash].[ext]!./file.png');
```

**Note**: This overrides the config `output.imageFilename`.

#### json

```js
var image = require('json!image-size?json!./file.png');
```

Use this incase you'd want to add more properties to the output json.

### Filename placeholders

* `[ext]` the extension of the resource
* `[name]` the basename of the resource
* `[path]` the path of the resource relative to the `context` query parameter or option.
* `[hash]` the hash of the content
* `[<hashType>:hash:<digestType>:<length>]` optionally you can configure
  * other `hashType`s, i. e. `sha1`, `md5`, `sha256`, `sha512`
  * other `digestType`s, i. e. `hex`, `base26`, `base32`, `base36`, `base49`, `base52`, `base58`, `base62`, `base64`
  * and `length` the length in chars
* `[N]` the N-th match obtained from matching the current file name against the query param `regExp`

Source: https://github.com/webpack/loader-utils#interpolatename

## Examples

#### webpack.config.js

```js
// webpack.config.js
module.exports = {
    output: {
        publicPath: 'public/'
    },
    module: {
        loaders: [
            {
                test: /\.(gif|jpeg|jpg|png|svg)$/,
                loader: 'image-size'
            }
        ]
    }
};
```

#### example_module.js

``` javascript
var result = require("./image.png");
// => {width: 500, height: 700, type: "png", src: "public/image.png", bytes: 1234}
```
