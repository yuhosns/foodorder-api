import User from "../models/user.model"
import { signToken } from "../helpers/jwttoken"
import Orders from "../models/orders.model"


export default class AuthController {
  /*
  |--------------------------------------------------------------------------
  | POST / LOGIN
  |--------------------------------------------------------------------------
  */
  static async onLogIn(req, res) {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json("Wrong username or password")
    }

    try {
      User.findOne({ username: username }, function (err, user) {
        if (err) throw err

        // check if user exist
        if (!user) {
          return res.status(400).json("Wrong username or password")
        }

        // check if password matched
        user.comparePassword(password, function (err, isMatch) {
          if (err) throw err
          if (isMatch === true) {
            return res.json({
              token: signToken(user),
            })
          } else {
            return res.status(400).json("Wrong username or password")
          }
        })
      })
    } catch (err) {
      console.error(err)
      return res.status(400).json(err)
    }
  }

  /*
  |--------------------------------------------------------------------------
  | GET / LOGGED IN USER PROFILE
  |--------------------------------------------------------------------------
  */
  static async getLoggedInUserProfile(req, res) {
    const { userID } = req.authClaims

    try {
      const response = await User.findById(userID)
      return res.json(response)
    } catch (err) {
      console.error(err)
      return res.status(400).json(err)
    }
  }

}

