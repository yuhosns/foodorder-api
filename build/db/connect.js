"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise;

var DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost:27017/pms";
var connectToDb = async function connectToDb() {
  try {
    await _mongoose2.default.connect(DATABASE_URL, { useNewUrlParser: true });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Could not connect to MongoDB");
  }
};

exports.default = connectToDb;