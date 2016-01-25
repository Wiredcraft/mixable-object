var util = require('util');
var slice = require('sliced');

var descriptor = Object.getOwnPropertyDescriptor;
var defineProp = Object.defineProperty;

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
function merge(source) {
  var i;
  var len;
  var keys = 2 <= arguments.length ? slice(arguments, 1) : [];
  if (keys.length > 0) {
    for (i = 0, len = keys.length; i < len; i++) {
      key = keys[i];
      if (!source.hasOwnProperty(key)) {
        throw new Error(util.format('Property not found: %s', key));
      }
    }
  } else {
    keys = Object.keys(source);
  }
  // Merge.
  for (i = 0, len = keys.length; i < len; i++) {
    var key = keys[i];
    // Recursive, if and only if the attribute is a value and is an object.
    var propT = descriptor(this, key);
    var propS = descriptor(source, key);
    if ((propT != null) && (propT.value != null) && typeof propT.value === 'object' &&
      (propS != null) && (propS.value != null) && typeof propS.value === 'object') {
      merge.call(this[key], source[key]);
    } else {
      defineProp(this, key, propS);
    }
  }
  return this;
}

module.exports = merge;
