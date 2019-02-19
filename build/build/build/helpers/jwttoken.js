"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signToken = undefined;

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var INSECURE_KEY = "insecure-key";
var DEFAULT_EXPIRATION = 60 * 60 * 24 * 365;
var JWT_SECRET = process.env.JWT_SECRET || INSECURE_KEY;

var jwtToken = function () {
  function jwtToken() {
    _classCallCheck(this, jwtToken);
  }

  _createClass(jwtToken, null, [{
    key: "authorize",
    value: function authorize(roles) {
      return async function (req, res, next) {

        // Get auth header
        var authHeader = req.header("Authorization");
        if (authHeader == null) {
          console.log("No auth header provided");
          // No auth header provided
          return res.status(401).json({
            type: "No auth header provided"
          });
        }

        // Parse header
        var parts = authHeader.split(" ");
        if (parts.length !== 2 || parts[0] !== "Bearer") {
          console.log("Auth header is malformed");
          // Auth header is malformed
          return res.status(401).json({
            type: "Auth header is malformed"
          });
        }

        // Decode token
        var token = parts[1];
        var decoded = void 0;

        try {
          decoded = _jsonwebtoken2.default.verify(token, JWT_SECRET);
        } catch (err) {
          console.log(err);
          // Token is invalid
          return res.status(401).json({
            type: "token_invalid"
          });
        }

        // Parse role
        var role = decoded.userRole;
        console.log(role, " logged in");

        // check if role permitted
        if (roles.indexOf(role) === -1) {
          return res.status(401).json({
            type: "Unauthorized"
          });
        }

        // Everything checks out
        req.authClaims = decoded;
        next();
      };
    }
  }]);

  return jwtToken;
}();

exports.default = jwtToken;

function signToken(user) {
  return _jsonwebtoken2.default.sign({
    userID: user.id,
    userRole: user.role,
    userName: user.username
  }, JWT_SECRET, { expiresIn: DEFAULT_EXPIRATION });
}

exports.signToken = signToken;