"use strict";

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SCHEMA = _mongoose2.default.Schema;
var vendorSchema = new SCHEMA({
  vendor: { type: String, required: true, index: { unique: true } },
  image: { data: Buffer, contentType: String }
});