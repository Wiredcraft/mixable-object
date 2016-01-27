var util = require('util');

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
  // Copy.
  for (var i = 0, len = keys.length; i < len; i++) {
    key = keys[i];
    defineProp(this, key, descriptor(source, key));
  }
  return this;
}

module.exports = mixin;
