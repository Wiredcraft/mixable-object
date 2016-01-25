var debug = require('debug')('carcass:test');

var should = require('should');
var mixable = require('../');

describe('Example:', function() {

  it('should work', function() {

    // A well prepared prototype.
    var proto = {
      doSomething: function() {
        return 'done something';
      }
    };

    // A random object.
    var obj = {};
    // Make it mixable.
    mixable(obj);
    // Mixin.
    obj.mixin(proto);
    // Now it can be used.
    obj.doSomething().should.equal('done something');

    // A random class.
    function Klass() {}
    // It also makes the prototype mixable.
    mixable(Klass);
    // Mixin.
    Klass.prototype.mixin(proto);
    // Now it can be used.
    var ins = new Klass();
    ins.doSomething().should.equal('done something');

  });

});
