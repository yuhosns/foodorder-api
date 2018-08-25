import User from "../models/user.model"

export default class UserController {
  /*
  |--------------------------------------------------------------------------
  | POST
  |--------------------------------------------------------------------------
  */
  static async onPost(req, res) {
    const { username, password } = req.body

    let userModel = new User({
      username: username,
      password: password,
      role:     "Staff",
    })

    try {
      const savedUser = await userModel.save()
      return res.json("added: " + savedUser)
    } catch (err) {
      console.log(err)
      return res.status(400).json(err)
    }
  }

  /*
  |--------------------------------------------------------------------------
  | PATCH
  |--------------------------------------------------------------------------
  */
  // TODO
  static async onPatch(req, res) {
    const { username, password } = req.body

    if (req.authClaims) {
      userRole = req.authClaims.userRole
    }


    let userModel = new User({
      role:     "Staff",
    })

    try {
      const savedUser = await userModel.save()
      return res.json("added: " + savedUser)
    } catch (err) {
      console.log(err)
      return res.status(400).json(err)
    }
  }



}
