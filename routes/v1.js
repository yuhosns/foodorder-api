import express from "express"
import bodyParser from "body-parser"
import jwtToken from "../helpers/jwttoken"
import UserController from "../controllers/user.ctrl"
import OrdersController from "../controllers/orders.ctrl"
import RequestController from "../controllers/request.ctrl"
import UsersController from "../controllers/users.ctrl"
import AuthController from "../controllers/auth.ctrl"

let router = express.Router()
const authorize = jwtToken.authorize

// Middleware
router.use(bodyParser.json())

// Routes
router.route("/login")
  .post(AuthController.onLogIn)

router.route("/profile")
  .get(authorize("Staff"), AuthController.getLoggedInUserProfile)

router.route("/users")
  .get(UsersController.onGet)

router.route("/user/add")
  .post(UserController.onPost)

router.route("/request/:id/delete")
  .delete(RequestController.onDelete)

router.route("/orders")
  .get(OrdersController.onGet)

router.route("/orders/add")
  .post(OrdersController.onPost)

router.route("/order/edit")
  .put(OrdersController.onPatch)

router.route("/boss")
  .get(authorize("Boss"), (req, res) => res.json("hello Boss"))

router.route("/test")
  .get((req, res) => res.send("hello"))

export default router

