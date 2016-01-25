// var debug = require('debug')('carcass:helper:mixin');

var descriptor = Object.getOwnPropertyDescriptor;
// var properties = Object.getOwnPropertyNames;
var defineProp = Object.defineProperty;

/**
 * The common mixin, simply merges properties, by redefining the same properties
 *   from the source.
 *
 * @param {Object} source
 *
 * @return {this}
 */
module.exports = function mixin(source) {
  // try {
  return Object.keys(source).reduce(function(self, key) {
    // if (source.propertyIsEnumerable(key)) {
    defineProp(self, key, descriptor(source, key));
    // }
    return self;
  }, this);
  // } catch (err) {
  //   debug(err);
  // }
};
