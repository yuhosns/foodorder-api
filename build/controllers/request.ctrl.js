"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _request = require("../models/request.model");

var _request2 = _interopRequireDefault(_request);

var _orders = require("../models/orders.model");

var _orders2 = _interopRequireDefault(_orders);

var _todaydate = require("../helpers/todaydate");

var _todaydate2 = _interopRequireDefault(_todaydate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TODAY_STRING = (0, _todaydate2.default)();

var RequestController = function () {
  function RequestController() {
    _classCallCheck(this, RequestController);
  }

  _createClass(RequestController, null, [{
    key: "onGet",

    /*
    |--------------------------------------------------------------------------
    | GET
    |--------------------------------------------------------------------------
    */
    value: async function onGet(req, res) {
      var id = req.params.id;
      try {
        var response = await _request2.default.findById(id);
        return res.json(response);
      } catch (err) {
        console.log(err);
        return res.status(400).json(err);
      }
    }

    /*
    |--------------------------------------------------------------------------
    | PATCH / UPDATE
    |--------------------------------------------------------------------------
    */

  }, {
    key: "onPatch",
    value: async function onPatch(req, res) {
      var _req$body = req.body,
          id = _req$body.id,
          foodNumbers = _req$body.foodNumbers;

      try {
        _orders2.default.findById(TODAY_STRING, { "orderList.$": 1 }, function (err, response) {
          console.log(response);
          if (response) {
            var orderToEdit = response.orderList.find(function (order) {
              return order._id.toString() === id;
            });

            console.log(orderToEdit._id);

            _orders2.default.findById("ObjectId('5b7e24b68d62bb3a2cc33074')", function (err, tank) {
              console.log(tank);
            });

            _orders2.default.findByIdAndUpdate(id, { $set: { foodNumbers: foodNumbers } }, function (error, success) {
              if (error) {
                console.log(error);
              } else {
                console.log(success, " success");
              }
            });
          }
        });
      } catch (err) {
        console.log(err);
        return res.status(400).json(err);
      }
    }

    /*
    |--------------------------------------------------------------------------
    | DELETE
    |--------------------------------------------------------------------------
    */

  }, {
    key: "onDelete",
    value: async function onDelete(req, res) {
      var id = req.body.id || req.params.id;
      var _req$body2 = req.body,
          orderID = _req$body2.orderID,
          totalAmount = _req$body2.totalAmount;

      try {

        await Promise.all([_request2.default.findByIdAndRemove(id), _orders2.default.findByIdAndUpdate(orderID, {
          $inc: { totalToPay: -totalAmount }
        })]);

        return res.end();
      } catch (err) {
        console.log(err);
        return res.status(400).json(err);
      }
    }
  }]);

  return RequestController;
}();

exports.default = RequestController;