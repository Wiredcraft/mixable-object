var util = require('util');

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
  var keys = [];
  if (arguments.length > 1) {
    for (var i = 1, len = arguments.length; i < len; i++) {
      var key = arguments[i];
      if (!source.hasOwnProperty(key)) {
        throw new Error(util.format('Property not found: %s', key));
      }
      keys.push(key);
    }
  } else {
    keys = Object.keys(source);
  }
  // Merge.
  for (var i = 0, len = keys.length; i < len; i++) {
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
