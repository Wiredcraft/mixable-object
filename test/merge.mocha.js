// var debug = require('debug')('carcass:test');

// var should = require('should');
var merge = require('../lib/merge');

describe('Merge:', function() {

    it('should be a function', function() {
        merge.should.be.type('function');
    });

    describe('Use with an object:', function() {

        var obj = {
            merge: merge
        };

        it('can merge from an object', function() {
            obj.lorem = true;
            delete obj.ipsum;
            obj.merge({
                ipsum: true
            });
            obj.should.have.property('lorem', true);
            obj.should.have.property('ipsum', true);
        });

        it('can merge from an object and override', function() {
            obj.lorem = true;
            delete obj.ipsum;
            obj.merge({
                lorem: false,
                ipsum: true
            });
            obj.should.have.property('lorem', false);
            obj.should.have.property('ipsum', true);
        });

        it('can merge from a function', function() {
            var func = function() {};
            func.ipsum = true;
            obj.lorem = true;
            delete obj.ipsum;
            obj.merge(func);
            obj.should.have.property('lorem', true);
            obj.should.have.property('ipsum', true);
        });

        it('cannot merge from a non-object', function() {
            (function() {
                obj.merge(1);
            }).should.throwError();
        });

        it('cannot merge from a non-object', function() {
            (function() {
                obj.merge(true);
            }).should.throwError();
        });

        it('can merge enumerable', function() {
            var other = Object.defineProperties({}, {
                ipsum: {
                    value: true,
                    enumerable: true,
                    configurable: true
                }
            });
            obj.lorem = true;
            delete obj.ipsum;
            obj.merge(other);
            obj.should.have.property('ipsum', true);
        });

        it('cannot merge non-enumerable', function() {
            var other = Object.defineProperties({}, {
                ipsum: {
                    value: true,
                    enumerable: false,
                    configurable: true
                }
            });
            obj.lorem = true;
            delete obj.ipsum;
            obj.merge(other);
            obj.should.not.have.property('ipsum');
        });

        it('can merge getters / setters', function() {
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
            obj.lorem = true;
            delete obj.ipsum;
            obj.merge(other);
            obj.should.have.property('ipsum', null);
            obj.ipsum = true;
            obj.should.have.property('ipsum', true);
            ipsum.should.equal(true);
            ipsum = false;
            obj.should.have.property('ipsum', false);
        });

        // TODO: (non-)writable, (non-)configurable

    });

    describe('Selective merge:', function() {

        var obj = {
            merge: merge
        };

        it('can merge with a key', function() {
            obj.lorem = true;
            delete obj.ipsum;
            obj.merge({
                lorem: false,
                ipsum: true
            }, 'ipsum');
            obj.should.have.property('lorem', true);
            obj.should.have.property('ipsum', true);
        });

        it('can merge with 2 keys', function() {
            obj.lorem = true;
            delete obj.ipsum;
            obj.merge({
                lorem: false,
                ipsum: true
            }, 'lorem', 'ipsum');
            obj.should.have.property('lorem', false);
            obj.should.have.property('ipsum', true);
        });

        it('cannot merge with a wrong key', function() {
            (function() {
                obj.merge({}, 'ipsum');
            }).should.throwError('Property not found: ipsum');
        });

        it('can merge a non-enumerable property', function() {
            obj.lorem = true;
            delete obj.ipsum;
            obj.merge(Object.defineProperties({}, {
                ipsum: {
                    value: true,
                    enumerable: false,
                    configurable: true
                }
            }), 'ipsum');
            obj.should.have.property('lorem', true);
            obj.should.have.property('ipsum', true);
        });

    });

    describe('Deep merge:', function() {

        var obj = {
            merge: merge
        };

        it('can merge from an object', function() {
            obj.lorem = {
                ipsum: true
            };
            obj.merge({
                lorem: {
                    dolor: true
                }
            });
            obj.should.have.property('lorem').with.type('object');
            obj.lorem.should.have.property('ipsum', true);
            obj.lorem.should.have.property('dolor', true);
        });

        it('can merge from an object and override', function() {
            obj.lorem = {
                ipsum: true,
                dolor: false
            };
            obj.merge({
                lorem: {
                    dolor: true
                }
            });
            obj.should.have.property('lorem').with.type('object');
            obj.lorem.should.have.property('ipsum', true);
            obj.lorem.should.have.property('dolor', true);
        });

        it('can merge enumerable', function() {
            var other = {
                lorem: {}
            };
            Object.defineProperty(other.lorem, 'dolor', {
                value: true,
                enumerable: true,
                configurable: true
            });
            obj.lorem = {
                ipsum: true
            };
            obj.merge(other);
            obj.should.have.property('lorem').with.type('object');
            obj.lorem.should.have.property('ipsum', true);
            obj.lorem.should.have.property('dolor', true);
        });

        it('cannot merge non-enumerable', function() {
            var other = {
                lorem: {}
            };
            Object.defineProperty(other.lorem, 'dolor', {
                value: true,
                enumerable: false,
                configurable: true
            });
            obj.lorem = {
                ipsum: true
            };
            obj.merge(other);
            obj.should.have.property('lorem').with.type('object');
            obj.lorem.should.have.property('ipsum', true);
            obj.lorem.should.not.have.property('dolor');
        });

        it('can merge getters / setters', function() {
            var dolor = null;
            var other = {
                lorem: {}
            };
            Object.defineProperty(other.lorem, 'dolor', {
                get: function() {
                    return dolor;
                },
                set: function(val) {
                    dolor = val;
                },
                enumerable: true,
                configurable: true
            });
            obj.lorem = {
                ipsum: true
            };
            obj.merge(other);
            obj.should.have.property('lorem').with.type('object');
            obj.lorem.should.have.property('ipsum', true);
            obj.lorem.should.have.property('dolor', null);
            obj.lorem.dolor = true;
            obj.lorem.should.have.property('dolor', true);
            dolor.should.equal(true);
            dolor = false;
            obj.lorem.should.have.property('dolor', false);
        });

        it('can merge getters / setters and override', function() {
            var lorem = {
                dolor: true
            };
            var other = {};
            Object.defineProperty(other, 'lorem', {
                get: function() {
                    return lorem;
                },
                enumerable: true,
                configurable: true
            });
            obj.lorem = {
                ipsum: true
            };
            obj.merge(other);
            obj.should.have.property('lorem').with.type('object');
            obj.lorem.should.not.have.property('ipsum');
            obj.lorem.should.have.property('dolor', true);
        });

    });

});
