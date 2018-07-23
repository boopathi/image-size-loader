var loaderUtils = require('loader-utils');
var sizeOf = require('image-size');
var fs = require('fs');

var imageToString = function(image) {
  return 'module.exports = {' + '\n'
    + '  src: __webpack_public_path__ + ' + JSON.stringify(image.src) + ',\n'
    + '  width: ' + JSON.stringify(image.width) + ',\n'
    + '  height: ' + JSON.stringify(image.height) + ',\n'
    + '  bytes: ' + JSON.stringify(image.bytes) + ',\n'
    + '  type: ' + JSON.stringify(image.type) + ',\n'
    + '};' + '\n'

    // For requires from CSS when used with webpack css-loader,
    // outputting an Object doesn't make sense,
    // So overriding the toString method to output just the URL
    + 'module.exports.toString = function() {' + '\n'
    + '  return __webpack_public_path__ + ' + JSON.stringify(image.src) + ';\n'
    + '};';
};

module.exports = function(content) {

  this.cacheable && this.cacheable(true);
  if(!this.emitFile) throw new Error('emitFile is required from module system');
  this.addDependency(this.resourcePath);

  var query = loaderUtils.parseQuery(this.query);
  var filename = "[name].[ext]";

  if ('string' === typeof query.name) {
    filename = query.name;
  }

  var url = loaderUtils.interpolateName(this, filename, {
    context: query.context || this.rootContext || this.options.context,
    content: content,
    regExp: query.regExp
  });

  var image = sizeOf(this.resourcePath);

  image.src = url;
  image.bytes = fs.statSync(this.resourcePath).size;

  this.emitFile(url, content);

  return imageToString(image);

};

module.exports.raw = true;
