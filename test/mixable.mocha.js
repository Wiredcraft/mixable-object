var debug = require('debug')('carcass:test');

var should = require('should');
var mixable = require('../lib/mixable');

describe('Mixable:', function() {

  it('should be a function', function() {
    mixable.should.be.type('function');
  });

  var lorem;

  var ipsum = {
    ipsum: true
  };

  describe('Use with nothing:', function() {

    it('should return a mixable object', function() {
      lorem = mixable();
      lorem.should.be.type('object');
      lorem.should.have.property('mixin').with.type('function');
    });

    it('can mixin', function() {
      lorem.should.not.have.property('ipsum');
      lorem.mixin(ipsum);
      lorem.should.have.property('ipsum', true);
    });

  });

  describe('Use with an object:', function() {

    it('should make it mixable', function() {
      lorem = {
        lorem: true
      };
      mixable(lorem).should.equal(lorem);
      lorem.should.be.type('object');
      lorem.should.have.property('lorem', true);
      lorem.should.have.property('mixin').with.type('function');
    });

    it('can mixin', function() {
      lorem.should.not.have.property('ipsum');
      lorem.mixin(ipsum);
      lorem.should.have.property('ipsum', true);
    });

  });

  describe('Use with an array:', function() {

    it('should make it mixable', function() {
      lorem = [
        'lorem'
      ];
      mixable(lorem).should.equal(lorem);
      lorem.should.be.type('object');
      lorem.should.have.property(0, 'lorem');
      lorem.should.have.property('length', 1);
      lorem.should.have.property('mixin').with.type('function');
    });

    it('can mixin', function() {
      lorem.should.not.have.property('ipsum');
      lorem.mixin(ipsum);
      lorem.should.have.property('ipsum', true);
    });

  });

  describe('Use with a function:', function() {

    it('should make it mixable', function() {
      lorem = function() {
        return true;
      };
      mixable(lorem).should.equal(lorem);
      lorem.should.be.type('function');
      lorem().should.equal(true);
      lorem.should.have.property('mixin').with.type('function');
    });

    it('can mixin', function() {
      lorem.should.not.have.property('ipsum');
      lorem.mixin(ipsum);
      lorem.should.have.property('ipsum', true);
    });

    it('should make the prototype mixable', function() {
      lorem.prototype.should.have.property('mixin').with.type('function');
    });

    it('can mixin to the prototype', function() {
      lorem.prototype.should.not.have.property('ipsum');
      lorem.prototype.mixin(ipsum);
      lorem.prototype.should.have.property('ipsum', true);
    });

  });

  describe('Use with something wrong:', function() {

    it('should return itself', function() {
      lorem = 'lorem';
      mixable(lorem).should.equal(lorem);
      lorem.should.be.type('string');
      lorem.should.equal('lorem');
      lorem.should.not.have.property('mixin');
    });

    it('should return itself', function() {
      lorem = 1;
      mixable(lorem).should.equal(lorem);
      lorem.should.be.type('number');
      lorem.should.equal(1);
      lorem.should.not.have.property('mixin');
    });

    it('should return itself', function() {
      lorem = true;
      mixable(lorem).should.equal(lorem);
      lorem.should.be.type('boolean');
      lorem.should.equal(true);
      lorem.should.not.have.property('mixin');
    });

  });

});
