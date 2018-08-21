import express from "express"
import bodyParser from "body-parser"
import userCtrl from "../controllers/user.ctrl"
import foodCtrl from "../controllers/foodorder.ctrl"

let router = express.Router()

// Middleware
router.use(bodyParser.json())

// Routes
router.route("/user/add")
  .post(userCtrl.addUser)

router.route("/order/add")
  .post(foodCtrl.addOrder)

router.route("/test")
  .get((req, res) => res.send("hello"))

export default router

