# debug = require('debug')('carcass:mixin')

util = require('util')

descriptor = Object.getOwnPropertyDescriptor
defineProp = Object.defineProperty

###*
 * Same as `mixin()` except that, for object attributes (and only for object
 *   attributes), it copies the child attributes. It does it recursively so the
 *   effect is very similar to a deep merge.
 *
 * @param {Object} source
 * @param {Mixed} ...keys if given only the attributes with the keys are copied
 *
 * @return {this}
###
module.exports = merge = (source, keys...) ->
    if keys.length > 0
        for key in keys
            if not source.hasOwnProperty(key)
                throw new Error(util.format('Property not found: %s', key))
    else
        keys = Object.keys(source)
    # Merge.
    for key in keys
        # Recursive, if and only if the attribute is a value and is an object.
        propT = descriptor(@, key)
        propS = descriptor(source, key)
        if propT? and propT.value? and typeof propT.value is 'object' and
        propS? and propS.value? and typeof propS.value is 'object'
            merge.call(@[key], source[key])
        else
            defineProp(@, key, propS)
    return @
