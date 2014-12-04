var fs = require('fs');
var sizeOf = require('image-size');

module.exports = function(content) {
  this.cacheable && this.cacheable();
  this.addDependency(this.resourcePath);
  var callback = this.async();
  fs.readFile(this.resourcePath, function(err, buf) {
    if (err) {
      return callback(err);
    }
    var dimensions = sizeOf(buf);
    callback(null, "module.exports = " + JSON.stringify(dimensions));
  });
};
