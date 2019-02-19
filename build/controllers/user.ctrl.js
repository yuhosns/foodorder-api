"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _user = require("../models/user.model");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserController = function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, null, [{
    key: "onPost",

    /*
    |--------------------------------------------------------------------------
    | POST
    |--------------------------------------------------------------------------
    */
    value: async function onPost(req, res) {
      var _req$body = req.body,
          username = _req$body.username,
          password = _req$body.password;


      var userModel = new _user2.default({
        username: username,
        password: password,
        role: "Staff"
      });

      try {
        var savedUser = await userModel.save();
        return res.json("added: " + savedUser);
      } catch (err) {
        console.log(err);
        return res.status(400).json(err);
      }
    }

    /*
    |--------------------------------------------------------------------------
    | PATCH
    |--------------------------------------------------------------------------
    */

    // TODO

  }, {
    key: "onPatch",
    value: async function onPatch(req, res) {
      var _req$body2 = req.body,
          username = _req$body2.username,
          password = _req$body2.password;


      if (req.authClaims) {
        userRole = req.authClaims.userRole;
      }

      var userModel = new _user2.default({
        role: "Staff"
      });

      try {
        var savedUser = await userModel.save();
        return res.json("added: " + savedUser);
      } catch (err) {
        console.log(err);
        return res.status(400).json(err);
      }
    }

    /*
    |--------------------------------------------------------------------------
    | SET ROLE
    |--------------------------------------------------------------------------
    */

  }, {
    key: "setRole",
    value: async function setRole(req, res) {
      var userID = req.body.userID || req.params.id;
      var role = req.body.role;

      try {

        var options = { new: true };
        var response = await _user2.default.findByIdAndUpdate(userID, {
          $set: { "role": role }
        }, options);
        return res.json(response);
      } catch (err) {
        console.log(err);
        return res.json(err);
      }
    }
  }]);

  return UserController;
}();

exports.default = UserController;