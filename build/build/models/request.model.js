"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestSchema = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var SCHEMA = _mongoose2.default.Schema;
var requestSchema = exports.requestSchema = new SCHEMA({
  name: { type: String, required: true },
  vendor: String,
  foodNumbers: String,
  totalAmount: { type: Number, get: getPrice, set: setPrice },
  status: String,
  order_id: String
});

function getPrice(num) {
  return (num / 100).toFixed(2);
}

function setPrice(num) {
  return num * 100;
}

exports.default = _mongoose2.default.model("Request", requestSchema);