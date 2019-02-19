"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.set("debug", true);
var SCHEMA = _mongoose2.default.Schema;
var ordersSchema = new SCHEMA({
  _id: String,
  totalToPay: { type: Number },
  orders: [{ type: _mongoose2.default.Schema.ObjectId, ref: "Request" }],
  date: Date
});

ordersSchema.pre("save", function (next) {
  this.date = Date.now();
  next();
});

exports.default = _mongoose2.default.model("orders", ordersSchema);