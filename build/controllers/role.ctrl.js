"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _role = require("../models/role.model");

var _role2 = _interopRequireDefault(_role);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RoleController = function () {
  function RoleController() {
    _classCallCheck(this, RoleController);
  }

  _createClass(RoleController, null, [{
    key: "onGet",
    value: async function onGet(req, res) {
      try {
        var response = await _role2.default.find({}, function (err, roles) {
          var roleMap = {};

          roles.forEach(function (role) {
            roleMap[role._id] = role;
          });
        });

        return res.json(response);
      } catch (err) {
        console.log(err);
        return res.json(err);
      }
    }
  }]);

  return RoleController;
}();

exports.default = RoleController;