# debug = require('debug')('carcass:mixin')

util = require('util')

descriptor = Object.getOwnPropertyDescriptor
defineProp = Object.defineProperty

###*
 * The common mixin, simply copies properties, by redefining the same properties
 *   from the source.
 *
 * @param {Object} source
 * @param {Mixed} ...keys if given only the attributes with the keys are copied
 *
 * @return {this}
###
module.exports = mixin = (source, keys...) ->
    if keys.length > 0
        for key in keys
            if not source.hasOwnProperty(key)
                throw new Error(util.format('Property not found: %s', key))
    else
        keys = Object.keys(source)
    # Copy.
    defineProp(@, key, descriptor(source, key)) for key in keys
    return @
