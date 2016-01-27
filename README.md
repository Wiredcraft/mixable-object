# Mixable Object

[![Build Status](https://travis-ci.org/Wiredcraft/mixable-object.svg?branch=master)](https://travis-ci.org/Wiredcraft/mixable-object) [![Coverage Status](https://coveralls.io/repos/github/Wiredcraft/mixable-object/badge.svg?branch=master)](https://coveralls.io/github/Wiredcraft/mixable-object?branch=master)

(Node.js) The way we do code reuse: simply copy things from an object to another.

Originally part of [Carcass](https://github.com/Wiredcraft/carcass).

> JavaScript is classified as a prototype-based scripting language...

It just works, without the magical inheritance blah blah.

## How to use

We usually prepare the code to be reused into "proto"s.

```js
var proto = {
    doSomething: function() {
        return 'done something';
    }
};
```

__A typical gotcha__: `proto.something = 'something';` - it usually doesn't make sense to share a simple value (as opposed to a function).

Then there are many ways to reuse it. One of them is simply copy it to an object.

```js
var mixable = require('mixable-object');
// A random object.
var obj = {};
// Make it mixable.
mixable(obj);
// Mixin.
obj.mixin(proto);
// Now it can be used.
// obj.doSomething().should.equal('done something');
```

However most of the time we want to reuse it with another prototype.

```js
var mixable = require('mixable-object');
// A random class.
function Klass() {}
// It also makes the prototype mixable.
mixable(Klass);
// Mixin.
Klass.prototype.mixin(proto);
// Now it can be used.
// var ins = new Klass();
// ins.doSomething().should.equal('done something');
```

## How it works

The code base is very simple, with just a few lines.

The `mixable()` function simply attaches a `mixin()` function to a given object (or if nothing was given, it builds a new object).

The `mixin()` function simply copies attributes from a source object to `this`.

__Selective mixin__: a 2nd or more arguments can be used, i.e. `mixin(source, 'keyOne', 'keyTwo', ...)` and if so, only the attributes with the keys are copied.

We've seen many similar implementations like `Object.assign()` from ES6 or another `mixin()` from [es5-ext](https://github.com/medikoo/es5-ext), while our `mixin()` has some notable features / differences:

1. Only enumerable attributes are copied by default unless you do selective mixin (see above).
2. Things are copied with `Object.defineProperty()`, so for example we will not copy the value that a getter returns but the getter itself.
3. The argument of `mixin()` is the source and the target is `this`. This is different with many other libraries where they usually have 2 arguments - the target and the source. This allows it to be chained like `obj.mixin(lorem).mixin(ipsum)`. However you can still do `mixin.call(target, source)` if you want to.

## Merge

`merge()` is a variant of `mixin()`, can be used like:

```js
var mixable = require('mixable-object');
var obj = {
    merge: mixable.merge
};
obj.merge(something);
```

Or:

```js
mixable.merge.call(obj, something);
```

`merge()` does the same thing with `mixin()` except that if:

1. both the source and the target has an attribute with the same name,
2. and the descriptors of both the attributes are values (not getters),
3. and both values are objects,

the `merge()` will copy the child attributes from the source, recursively, results in a deep merge.

## Git summary

```
 project  : mixable-object
 repo age : 1 year, 1 month
 active   : 6 days
 commits  : 20
 files    : 21
 authors  :
    20  Makara Wang  100.0%
```
