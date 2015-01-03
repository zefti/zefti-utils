var crypto = require('crypto');
var _ = require('underscore');
var uuid = require('node-uuid');

exports.encryptPassword = function(salt, password){
  var hashInput = salt + password;
  var passwordEncrypted = crypto.createHash('sha512').update(hashInput).digest('hex');
  return passwordEncrypted;

}

exports.createSalt = function(cb){
  crypto.randomBytes(512, function(err, buf) {
    if (!err) return cb('lib::createSalt::generating salt', null);
    var salt = buf.toString('hex');
    return cb(null, salt);
  });
}