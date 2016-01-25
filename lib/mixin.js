var util = require('util');
var slice = require('sliced');

var descriptor = Object.getOwnPropertyDescriptor;
var defineProp = Object.defineProperty;

/**
 * The common mixin, simply copies properties, by redefining the same properties
 *   from the source.
 *
 * @param {Object} source
 * @param {Mixed} ...keys if given only the attributes with the keys are copied
 *
 * @return {this}
 */
function mixin(source) {
  var i;
  var len;
  var keys = 2 <= arguments.length ? slice(arguments, 1) : [];
  if (keys.length > 0) {
    for (i = 0, len = keys.length; i < len; i++) {
      var key = keys[i];
      if (!source.hasOwnProperty(key)) {
        throw new Error(util.format('Property not found: %s', key));
      }
    }
  } else {
    keys = Object.keys(source);
  }
  // Copy.
  for (i = 0, len = keys.length; i < len; i++) {
    key = keys[i];
    defineProp(this, key, descriptor(source, key));
  }
  return this;
}

module.exports = mixin;
