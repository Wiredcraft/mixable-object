var mixin = require('./mixin');

var defineProp = Object.defineProperty;

// Copied from bluebird.
function isPrimitive(val) {
  return val == null || val === true || val === false ||
    typeof val === 'string' || typeof val === 'number';
}

/**
 * Add a mixin() function to a target object.
 *
 * @param {Object}
 *
 * @return {Object}
 */
function mixable(obj, recursive) {
  if (obj == null) {
    obj = {};
  }
  if (recursive == null) {
    recursive = true;
  }
  // Do not override the mixin function, even it is not mine.
  if (isPrimitive(obj) || obj.mixin != null) {
    return obj;
  }
  // Recursively make the prototypes mixable.
  if (recursive && (obj.prototype != null)) {
    mixable(obj.prototype);
  }
  // The common mixin.
  defineProp(obj, 'mixin', {
    configurable: true,
    enumerable: false,
    value: mixin
  });
  return obj;
}

module.exports = mixable;
