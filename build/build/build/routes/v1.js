"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _jwttoken = require("../helpers/jwttoken");

var _jwttoken2 = _interopRequireDefault(_jwttoken);

var _user = require("../controllers/user.ctrl");

var _user2 = _interopRequireDefault(_user);

var _orders = require("../controllers/orders.ctrl");

var _orders2 = _interopRequireDefault(_orders);

var _request = require("../controllers/request.ctrl");

var _request2 = _interopRequireDefault(_request);

var _users = require("../controllers/users.ctrl");

var _users2 = _interopRequireDefault(_users);

var _auth = require("../controllers/auth.ctrl");

var _auth2 = _interopRequireDefault(_auth);

var _role = require("../controllers/role.ctrl");

var _role2 = _interopRequireDefault(_role);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var router = _express2.default.Router();
var authorize = _jwttoken2.default.authorize;

// Middleware
router.use(_bodyParser2.default.json());

// Routes
router.route("/login").post(_auth2.default.onLogIn);

router.route("/profile").get(authorize(["Boss", "Staff"]), _auth2.default.getLoggedInUserProfile);

router.route("/users").get(_users2.default.onGet);

router.route("/user/add").post(_user2.default.onPost);

router.route("/user/:id/role").post(authorize("Boss"), _user2.default.setRole);

router.route("/roles").get(_role2.default.onGet);

router.route("/request/:id").delete(authorize(["Boss", "Staff"]), _request2.default.onDelete);

router.route("/orders").get(_orders2.default.onGet);

router.route("/orders/add").post(_orders2.default.onPost);

router.route("/order/edit").put(_orders2.default.onPatch);

router.route("/boss").get(authorize("Boss"), function (req, res) {
  return res.json("hello Boss");
});

router.route("/test").get(function (req, res) {
  return res.send("hello");
});

exports.default = router;