"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _user = require("../models/user.model");

var _user2 = _interopRequireDefault(_user);

var _request = require("../models/request.model");

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UsersController = function () {
  function UsersController() {
    _classCallCheck(this, UsersController);
  }

  _createClass(UsersController, null, [{
    key: "onGet",

    /*
    |--------------------------------------------------------------------------
    | GET
    |--------------------------------------------------------------------------
    */
    value: async function onGet(req, res) {
      try {
        var response = await _user2.default.find({}, function (err, users) {
          var userMap = {};

          users.forEach(function (user) {
            userMap[user._id] = user;
          });
        });

        return res.json(response);
      } catch (err) {
        console.log(err);
        return res.status(400).json(err);
      }
    }
  }]);

  return UsersController;
}();

exports.default = UsersController;