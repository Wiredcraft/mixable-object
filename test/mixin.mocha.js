// var debug = require('debug')('carcass:test');

// var should = require('should');
var mixin = require('../lib/mixin');

describe('Mixin:', function() {

    it('should be a function', function() {
        mixin.should.be.type('function');
    });

    describe('Use with an object:', function() {

        var obj = {
            lorem: true,
            mixin: mixin
        };

        it('can mixin from an object', function() {
            delete obj.ipsum;
            obj.mixin({
                ipsum: true
            });
            obj.should.have.property('lorem', true);
            obj.should.have.property('ipsum', true);
        });

        it('can mixin from a function', function() {
            var func = function() {};
            func.ipsum = true;
            delete obj.ipsum;
            obj.mixin(func);
            obj.should.have.property('lorem', true);
            obj.should.have.property('ipsum', true);
        });

        it('cannot mixin from a non-object', function() {
            (function() {
                obj.mixin(1);
            }).should.throwError();
        });

        it('cannot mixin from a non-object', function() {
            (function() {
                obj.mixin(true);
            }).should.throwError();
        });

        it('can mixin enumerable', function() {
            var other = Object.defineProperties({}, {
                ipsum: {
                    value: true,
                    enumerable: true,
                    configurable: true
                }
            });
            delete obj.ipsum;
            obj.mixin(other);
            obj.should.have.property('ipsum', true);
        });

        it('cannot mixin non-enumerable', function() {
            var other = Object.defineProperties({}, {
                ipsum: {
                    value: true,
                    enumerable: false,
                    configurable: true
                }
            });
            delete obj.ipsum;
            obj.mixin(other);
            obj.should.not.have.property('ipsum');
        });

        it('can mixin getters / setters', function() {
            var ipsum = null;
            var other = Object.defineProperties({}, {
                ipsum: {
                    get: function() {
                        return ipsum;
                    },
                    set: function(val) {
                        ipsum = val;
                    },
                    enumerable: true,
                    configurable: true
                }
            });
            delete obj.ipsum;
            obj.mixin(other);
            obj.should.have.property('ipsum', null);
            obj.ipsum = true;
            obj.should.have.property('ipsum', true);
            ipsum.should.equal(true);
            ipsum = false;
            obj.should.have.property('ipsum', false);
        });

        // TODO: (non-)writable, (non-)configurable

    });

});
