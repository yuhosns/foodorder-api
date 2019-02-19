"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _user = require("../models/user.model");

var _user2 = _interopRequireDefault(_user);

var _jwttoken = require("../helpers/jwttoken");

var _orders = require("../models/orders.model");

var _orders2 = _interopRequireDefault(_orders);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var AuthController = function () {
  function AuthController() {
    _classCallCheck(this, AuthController);
  }

  _createClass(AuthController, null, [{
    key: "onLogIn",

    /*
    |--------------------------------------------------------------------------
    | POST / LOGIN
    |--------------------------------------------------------------------------
    */
    value: async function onLogIn(req, res) {
      var _req$body = req.body,
          username = _req$body.username,
          password = _req$body.password;

      if (!username || !password) {
        return res.status(400).json({ message: "Wrong username or password" });
      }

      try {
        _user2.default.findOne({ username: username }, function (err, user) {
          if (err) throw err;

          // check if user exist
          if (!user) {
            return res.status(400).json({ message: "Wrong username or password" });
          }

          // check if password matched
          user.comparePassword(password, function (err, isMatch) {
            if (err) throw err;
            if (isMatch === true) {
              return res.json({
                token: (0, _jwttoken.signToken)(user)
              });
            } else {
              return res.status(400).json({ message: "Wrong username or password" });
            }
          });
        });
      } catch (err) {
        console.error(err);
        return res.status(400).json(err);
      }
    }

    /*
    |--------------------------------------------------------------------------
    | GET / LOGGED IN USER PROFILE
    |--------------------------------------------------------------------------
    */

  }, {
    key: "getLoggedInUserProfile",
    value: async function getLoggedInUserProfile(req, res) {
      var userID = req.authClaims.userID;

      try {
        var response = await _user2.default.findById(userID);
        return res.json(response);
      } catch (err) {
        console.error(err);
        return res.status(400).json(err);
      }
    }
  }]);

  return AuthController;
}();

exports.default = AuthController;