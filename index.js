var sizeOf = require('image-size');
var loaderUtils = require('loader-utils');

module.exports = function(content) {
  this.cacheable && this.cacheable();
  if(!this.emitFile) throw new Error('emitFile is required from module system');

  this.addDependency(this.resourcePath);

  var query = loaderUtils.parseQuery(this.query);
  var filename = "[name].[ext]";

  if ('string' === typeof query.name) {
    filename = query.name;
  } else if (this.options.output.imageFilename) {
    filename = this.options.output.imageFilename
  }

  var url = loaderUtils.interpolateName(this, filename, {
    context: query.context || this.options.context,
    content: content,
    regExp: query.regExp
  });

  var dimensions = sizeOf(content);

  dimensions.src = this.options.output.publicPath
    ? this.options.output.publicPath + url
    : url;

  this.emitFile(url, content);
  return 'module.exports = ' + JSON.stringify(dimensions);
};

module.exports.raw = true;
