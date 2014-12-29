var isPrimitive, mixable, mixin;

mixin = require('./mixin');

isPrimitive = function(value) {
  return (value == null) || (value === true) || (value === false) || (typeof value === 'string') || (typeof value === 'number');
};


/**
 * Add a mixin() function to a target object.
 *
 * @param {Object}
 *
 * @return {Object}
 */

module.exports = mixable = function(obj, recursive) {
  if (obj == null) {
    obj = {};
  }
  if (recursive == null) {
    recursive = true;
  }
  if (isPrimitive(obj) || obj.mixin) {
    return obj;
  }
  if (recursive && (obj.prototype != null)) {
    mixable(obj.prototype);
  }
  obj.mixin = mixin;
  return obj;
};
