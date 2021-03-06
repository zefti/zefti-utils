var fs = require('fs');
var crypto = require('crypto');
var _ = require('underscore');
var parser = require('socket.io-parser');
var hasBin = require('has-binary');
var uuid = require('node-uuid');
var msgpack = require('msgpack-js');

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

  methods.isEmpty = function(item){
    if (this.type(item) === 'object'){
      return Object.keys(item).length === 0 && JSON.stringify(item) === JSON.stringify({});
    }
  };

  methods.makeDate = function(item) {
    var dateTest = new Date(item);
    if (dateTest.getTime()) return dateTest;
    var dateTest2 = new Date(parseInt(item));
    if (dateTest2.getTime()) return dateTest2;
    return null;
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

  methods.fileExists = function(path){
    try {
      stats = fs.statSync(path);
      if (stats) return true;
    }
    catch (e) {
      return false;
    }
  };

  methods.getConnectionIds = function(uid1, uid2){
    var connection1 = uid1.toString() + uid2.toString();
    var connection2 = uid2.toString() + uid1.toString();

    var hashedConnection1 = crypto.createHash('md5').update(connection1).digest("hex");
    var hashedConnection2 = crypto.createHash('md5').update(connection2).digest("hex");

    var result = {};
    result[uid1.toString()] = hashedConnection1;
    result[uid2.toString()] = hashedConnection2;

    return result;

  };

methods.prepareSocketIo = function(channel, type, data, appName){
  var packet = {};
  packet.type = 2//hasBin(args) ? parser.BINARY_EVENT : parser.EVENT;
  packet.data = [type, data];
  packet.nsp = '/' + appName;
  var fullChannel =  'zefti#' + '/' + appName + '#' + channel + '#';
  var encodedData = msgpack.encode(['emitter', packet, { rooms:[channel] } ]);
  return {fullChannel:fullChannel, encodedData:encodedData};
};

methods.deepMerge = function(target, source) {
  for (var key in source) {
    var original = target[key];
    var next = source[key];
    if (original && next && typeof next == "object") {
      this.deepMerge(original, next);
    } else {
      target[key] = next;
    }
  }
  return target;
};

methods.addOptionalFields = function(optionalFields, fields, payload){
  optionalFields.forEach(function(field){
    if (payload[field]) fields[field] = payload[field];
  });
  return fields;
};



methods.resolve5Arguments = function(arguments){
  return resolveArguments(arguments, 5);
};

methods.resolve4Arguments = function(arguments){
  return resolveArguments(arguments, 4);
};

methods.resolve3Arguments = function(arguments){
  return resolveArguments(arguments, 3);
};

methods.resolve2Arguments = function(arguments){
  return resolveArguments(arguments, 2);
};
/*
function resolveArguments(arguments, num){
  var intArgs = [];
  var newArgs = Array.prototype.slice.call(arguments);
  if (newArgs.length === num) return newArgs;
  console.log(newArgs.length)
  if (newArgs.length > 1) {
    console.log('ding')
    intArgs[num-1] = newArgs.splice([newArgs.length - 1])[0] || function(){};
    num -= 1;
  }
  console.log(intArgs);
  for(var i=0;i<num; i++){
    intArgs[i] = newArgs[i] || {};
  }
  return intArgs;
}*/


function resolveArguments(arguments, num){
  var intArgs = [];
  var newArgs = Array.prototype.slice.call(arguments);
  if (newArgs.length === num) return newArgs;
  if (newArgs.length > num) throw new Error('too many arguments provided to reduce');
  if (methods.type(newArgs[newArgs.length-1]) === 'function') {
    intArgs[num - 1] = newArgs.splice(newArgs.length-1, 1)[0]
  } else {
    intArgs[num - 1] = function(){};
  }
  num--;
  for(var i=0;i<num; i++){
    intArgs[i] = newArgs[i] || {};
  }
  return intArgs;
}

module.exports = methods;