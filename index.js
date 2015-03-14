var fs = require('fs');
var crypto = require('crypto');
var _ = require('underscore');
var uuid = require('node-uuid');

module.exports = function(options) {

  var methods = {};

  methods.encryptPassword = function (salt, password) {
    var hashInput = salt + password;
    var passwordEncrypted = crypto.createHash('sha512').update(hashInput).digest('hex');
    return passwordEncrypted;
  };

  methods.createSalt = function (cb) {
    crypto.randomBytes(512, function (err, buf) {
      if (!err) return cb('lib::createSalt::generating salt', null);
      var salt = buf.toString('hex');
      return cb(null, salt);
    });
  };

  /*
   * Output:
   * 'abc' = string
   * '5' = string
   * 5 = number
   * 0 = number
   * 5.6788 = number
   * NaN = NaN
   * true = boolean
   * false = boolean
   * {} = object
   * [] = array
   * null = null
   *
   */

  methods.type = function (item) {
    switch (typeof item) {
      case 'string':
        return 'string';
      case 'number':
        if (isNaN(item)) return 'NaN'
        return 'number';
      case 'boolean':
        return 'boolean';
      case 'function':
        return 'function';
      case 'undefined':
        return 'undefined';
      case 'object':
        if (item instanceof Array) {
          return 'array';
        } else if (item === null) {
          return 'null';
        } else {
          return 'object';
        }
    }
  };

  methods.numberType = function(n) {
    if (typeof n !== 'number' || isNaN(n)) return NaN;
    if (n%1===0) return 'integer'
    return 'float'
  };

  methods.createPath = function(){
    var path = '';
    var args = Array.prototype.slice.call(arguments);
    args.forEach(function(segment){
      if (methods.type(segment) !== 'string') throw new Error('createPath: segment is not a string');
      if (segment[0] !== '/') segment = '/' + segment;
      if (segment[segment.length - 1] === '/') segment = segment.slice(0,-1);
      path += segment;
    });
    return path;
  };

  methods.createObjFromDir = function(dir){
    var obj = {};
    var files = fs.readdirSync(dir);
    files.forEach(function(file){
      var name = file.slice(0, -file.split('.').pop().length - 1)
      obj[name] = require(methods.createPath(dir, file));
    });
    return obj;
  }

  return methods;

};