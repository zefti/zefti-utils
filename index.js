var fs = require('fs');
var crypto = require('crypto');
var _ = require('underscore');
var uuid = require('node-uuid');

  var methods = {};

  methods.encryptPassword = function (salt, password) {
    var hashInput = salt + password;
    var passwordEncrypted = crypto.createHash('sha512').update(hashInput).digest('hex');
    return passwordEncrypted;
  };

  methods.createSalt = function (cb) {
    crypto.randomBytes(512, function (err, buf) {
      if (err) return cb('lib::createSalt::generating salt', null);
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
        } else if (item instanceof Date) {
          return 'date';
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
  };

  methods.reduce3ObjAndCb = function(payload){
    var args = Array.prototype.slice.call(payload);
    if (args.length === 4) return args;
    if (args.length === 3 && this.type(args[2]) === 'function') {
      args.splice(2, 0, {});
      return args;
    }
    if (args.length === 3) {
      args[3] = function(){};
      return args;
    }
    if (args.length === 2 && this.type(args[1]) === 'function') {
      args.splice(1, 0, {}, {});
      return args;
    }
    if (args.length === 2) {
      args[2] = {};
      args[3] = function(){};
      return args;
    }
    if (args.length === 1 && this.type(args[0]) === 'function') {
      args.splice(0, 0, {}, {}, {});
      return args;
    }
    if (args.length === 1) {
      args[1] = {};
      args[2] = {};
      args[3] = function(){};
      return args;
    }
    if (args.length === 0) throw new Error('reduce arguments - no arguments provided');
  };

  methods.validateEmail = function(email) {
    var str = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return str.test(email);
  };

  methods.validatePhoneNumber = function(phoneNumber){
    var str = phoneNumber.replace(/[^0-9]+/g, '');
  };

  methods.createDirectory = function(directory, mask) {
    if (!mask) {
      var mask = 0777;
    }
    var dirArr = directory.split('/');
    var dirPath = '';
    dirArr.forEach(function(segment, index){
      if (segment) {
        if (segment === '~' || segment === '.' || segment === '..' && index === 0) {
          dirPath = segment;
          return;
        } else {
          dirPath = dirPath + '/' + segment;
        }
        try {
          fs.mkdirSync(dirPath, mask);
        } catch (err) {
          if (err && err.code !== 'EEXIST') throw new Error(err);
        }
      }
    });
  };


  methods.deleteFolderRecursive = function(path) {
    if( fs.existsSync(path) ) {
      fs.readdirSync(path).forEach(function(file,index){
        var curPath = path + "/" + file;
        if(fs.lstatSync(curPath).isDirectory()) { // recurse
          deleteFolderRecursive(curPath);
        } else { // delete file
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(path);
    }
  };

module.exports = methods;