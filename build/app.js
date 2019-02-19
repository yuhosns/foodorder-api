"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _v = require("./routes/v1");

var _v2 = _interopRequireDefault(_v);

var _connect = require("./db/connect");

var _connect2 = _interopRequireDefault(_connect);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var PORT = process.env.PORT || "8080";

(0, _connect2.default)();

app.use((0, _cors2.default)());

// Set up router
app.use("/v1", _v2.default);

// Listen and serve
app.listen(PORT, function () {
  console.log("API listening on port " + PORT + ".");
});