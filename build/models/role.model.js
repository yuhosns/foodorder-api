"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SCHEMA = _mongoose2.default.Schema;
var RoleSchema = new SCHEMA({
  roleName: { type: String, required: true },
  permissions: Array //TODO permissions schema
});

var Role = _mongoose2.default.model("Role", RoleSchema);
exports.default = Role;