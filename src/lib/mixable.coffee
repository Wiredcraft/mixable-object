mixin = require('./mixin')

# Copied from bluebird.
isPrimitive = (value) ->
    return (not value?) or (value is true) or (value is false) or
        (typeof value is 'string') or (typeof value is 'number')

###*
 * Add a mixin() function to a target object.
 *
 * @param {Object}
 *
 * @return {Object}
###
module.exports = mixable = (obj = {}, recursive = true) ->
    # Do not override the mixin function, even it is not mine.
    return obj if isPrimitive(obj) or obj.mixin
    # Recursively make the prototypes mixable.
    mixable(obj.prototype) if recursive and obj.prototype?
    # The common mixin.
    obj.mixin = mixin
    return obj
