# debug = require('debug')('carcass:mixin')

descriptor = Object.getOwnPropertyDescriptor
# properties = Object.getOwnPropertyNames
defineProp = Object.defineProperty

###*
 * The common mixin, simply merges properties, by redefining the same properties
 *   from the source.
 *
 * Note that only enumerable properties are merged.
 *
 * @param {Object} source
 *
 * @return {this}
###
module.exports = mixin = (source) ->
    # Merge.
    # TODO: optionally prevent overriding?
    # TODO: optionally merge non-enumerable properties?
    for key in Object.keys(source)
        defineProp(@, key, descriptor(source, key))
    return @
