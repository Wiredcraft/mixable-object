var defineProp, descriptor, mixin, util,
  __slice = [].slice;

util = require('util');

descriptor = Object.getOwnPropertyDescriptor;

defineProp = Object.defineProperty;


/**
 * The common mixin, simply copies properties, by redefining the same properties
 *   from the source.
 *
 * @param {Object} source
 * @param {Mixed} ...keys if given only the attributes with the keys are copied
 *
 * @return {this}
 */

module.exports = mixin = function() {
  var key, keys, source, _i, _j, _len, _len1;
  source = arguments[0], keys = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
  if (keys.length > 0) {
    for (_i = 0, _len = keys.length; _i < _len; _i++) {
      key = keys[_i];
      if (!source.hasOwnProperty(key)) {
        throw new Error(util.format('Property not found: %s', key));
      }
    }
  } else {
    keys = Object.keys(source);
  }
  for (_j = 0, _len1 = keys.length; _j < _len1; _j++) {
    key = keys[_j];
    defineProp(this, key, descriptor(source, key));
  }
  return this;
};
