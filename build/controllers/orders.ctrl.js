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

var OrdersController = function () {
  function OrdersController() {
    _classCallCheck(this, OrdersController);
  }

  _createClass(OrdersController, null, [{
    key: "onPost",

    /*
    |--------------------------------------------------------------------------
    | POST
    |--------------------------------------------------------------------------
    */
    value: async function onPost(req, res) {
      var _req$body = req.body,
          name = _req$body.name,
          vendor = _req$body.vendor,
          foodNumbers = _req$body.foodNumbers,
          totalAmount = _req$body.totalAmount,
          status = _req$body.status;


      var validateAmount = false;
      if (totalAmount) {
        validateAmount = /^[0-9]*\.?[0-9]*$/.test(totalAmount);
      }

      if (validateAmount === false) {
        return res.status(400).json({ type: "totalAmount_number_only" });
      }

      // order to submit
      try {
        // personal request
        var request = new _request2.default({
          name: name,
          vendor: vendor,
          foodNumbers: foodNumbers,
          totalAmount: totalAmount,
          status: status,
          order_id: TODAY_STRING
        });
        request.save();

        _orders2.default.collection.countDocuments({ _id: TODAY_STRING }, async function (err, count) {
          if (count > 0) {
            var response = await _orders2.default.findByIdAndUpdate(TODAY_STRING, {
              "$push": { "orders": request },
              $inc: { totalToPay: +request.totalAmount }
            });

            console.log("今天已有订单，添加多一单");
            return res.json(response);
          } else {
            var orders = new _orders2.default();
            orders._id = TODAY_STRING;
            orders.totalToPay = request.totalAmount;
            orders.orders.push(request);
            var _response = await orders.save();
            console.log("今天还没有人下订单，添加新的订单");
            return res.json(_response);
          }
        });
      } catch (err) {
        console.log(err);
        return res.status(500).json({
          type: "database_failure"
        });
      }
    }

    /*
    |--------------------------------------------------------------------------
    | GET
    |--------------------------------------------------------------------------
    */

  }, {
    key: "onGet",
    value: async function onGet(req, res) {
      try {
        var response = await _orders2.default.find().sort('-date').populate("orders");
        return res.json(response);
      } catch (err) {
        console.log(err);
        return res.status(500).json({
          type: "database_failure"
        });
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
      var _req$body2 = req.body,
          id = _req$body2.id,
          foodNumbers = _req$body2.foodNumbers;

      try {
        /*
        Orders.findById(TODAY_STRING, { "orderList.$": 1 }, function (err, response) {
          console.log(response)
          if (response) {
            const orderToEdit = response.orderList.find(order => {
              return order._id.toString() === id
            })
              console.log(orderToEdit._id)
              Orders.findById("ObjectId('5b7e24b68d62bb3a2cc33074')", function (err, tank) {
              console.log(tank)
            })
              Orders.findByIdAndUpdate(id,
              { $set: { foodNumbers: foodNumbers } },
              function (error, success) {
                if (error) {
                  console.log(error)
                } else {
                  console.log(success, " success")
                }
              },
            )
          }
        })
        */
      } catch (err) {
        console.log(err);
        return res.status(500).json({
          type: "database_failure"
        });
      }
    }
  }]);

  return OrdersController;
}();

exports.default = OrdersController;