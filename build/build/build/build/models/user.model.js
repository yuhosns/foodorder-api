"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcrypt = require("bcrypt");

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var SALT_WORK_FACTOR = 10;
var SCHEMA = _mongoose2.default.Schema;
var UserSchema = new SCHEMA({
  username: { type: String, unique: true, required: true, index: { unique: true } },
  password: { type: String, required: true },
  role: String
});

UserSchema.pre("save", function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) {
    return next();
  }

  // generate a salt
  _bcrypt2.default.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) {
      return next(err);
    }

    // hash the password using our new salt
    _bcrypt2.default.hash(user.password, salt, function (err, hash) {
      if (err) {
        return next(err);
      }

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  _bcrypt2.default.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

exports.default = _mongoose2.default.model("User", UserSchema);