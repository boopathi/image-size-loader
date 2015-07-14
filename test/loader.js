var test = require('tape');
var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var webpackConfig = require('./workdir/webpack.config');

test('local test', function(t) {
  t.plan(1);

  webpack(webpackConfig, function(err, stats) {
    var s = stats.toJson();
    t.equal(s.modules[1].source, "module.exports = {\"width\":1578,\"height\":1503,\"type\":\"png\",\"src\":\"star.png\",\"bytes\":111405};module.exports.toString = function() {return \"star.png\"}");
  })
});
