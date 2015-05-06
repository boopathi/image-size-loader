# image size loader for webpack

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

``` javascript
var image = require("image-size!./file.png");
// => returns js object: i.e. { width: 400, height: 300, type: "png", src: "file.png" }
```

## Options

### Output filename

You can use the placeholders specified here -

* `[ext]` the extension of the resource
* `[name]` the basename of the resource
* `[path]` the path of the resource relative to the `context` query parameter or option.
* `[hash]` the hash of `options.content` (Buffer) (by default it's the hex digest of the md5 hash)
* `[<hashType>:hash:<digestType>:<length>]` optionally one can configure
  * other `hashType`s, i. e. `sha1`, `md5`, `sha256`, `sha512`
  * other `digestType`s, i. e. `hex`, `base26`, `base32`, `base36`, `base49`, `base52`, `base58`, `base62`, `base64`
  * and `length` the length in chars
* `[N]` the N-th match obtained from matching the current file name against `options.regExp`

Source: https://github.com/webpack/loader-utils#interpolatename

#### `config.output.imageFilename`

```js
// webpack.config.js
module.exports = {
    output: {
        imageFilename: '[name]-[hash].[ext]'
    }
}
```

#### query param

```js
var image = require('image-size!./file.png?name=[hash].[ext]');
```

#### `config.output.publicPath`

The path/URL that gets prepended to the imageFilename -
https://github.com/webpack/docs/wiki/configuration#outputpublicpath

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
