var defineProp, descriptor, mixin;

descriptor = Object.getOwnPropertyDescriptor;

defineProp = Object.defineProperty;


/**
 * The common mixin, simply merges properties, by redefining the same properties
 *   from the source.
 *
 * Note that only enumerable properties are merged.
 *
 * @param {Object} source
 *
 * @return {this}
 */

module.exports = mixin = function(source) {
  var key, _i, _len, _ref;
  _ref = Object.keys(source);
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    key = _ref[_i];
    defineProp(this, key, descriptor(source, key));
  }
  return this;
};
