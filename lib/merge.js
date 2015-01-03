var defineProp, descriptor, merge, util,
  __slice = [].slice;

util = require('util');

descriptor = Object.getOwnPropertyDescriptor;

defineProp = Object.defineProperty;


/**
 * Same as `mixin()` except that, for object attributes (and only for object
 *   attributes), it copies the child attributes. It does it recursively so the
 *   effect is very similar to a deep merge.
 *
 * @param {Object} source
 * @param {Mixed} ...keys if given only the attributes with the keys are copied
 *
 * @return {this}
 */

module.exports = merge = function() {
  var key, keys, propS, propT, source, _i, _j, _len, _len1;
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
    propT = descriptor(this, key);
    propS = descriptor(source, key);
    if ((propT != null) && (propT.value != null) && typeof propT.value === 'object' && (propS != null) && (propS.value != null) && typeof propS.value === 'object') {
      merge.call(this[key], source[key]);
    } else {
      defineProp(this, key, propS);
    }
  }
  return this;
};
