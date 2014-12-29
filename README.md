# Mixable Object

(Node.js) The way we do code reuse: simply copy things from an object to another.

Originally part of [Carcass](https://github.com/Wiredcraft/carcass).

> JavaScript is classified as a prototype-based scripting language ...

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

We've seen many similar implementations like `Object.assign()` from ES6 or another `mixin()` from [es5-ext](https://github.com/medikoo/es5-ext), while our `mixin()` has some notable features:

- We are using `Object.keys()`, meaning that only enumerable attributes are copied.
- Things are copied with `Object.defineProperty()`, so for example we will not copy the value that a getter returns but the getter itself.
- The argument of `mixin()` is the source and the target is `this`, as opposed to many other implementations where they usually have 2 arguments - the target and the source. This allows it to be chained like `obj.mixin(lorem).mixin(ipsum)`. However you can still do `mixin.call(target, source)` if you want to.
