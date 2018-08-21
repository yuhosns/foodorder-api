import User from "../models/user.model"

const controller = {}

controller.addUser = async (req, res) => {
  const { username, password } = req.body
  let userModel = new User({
    username: username,
    password: password,
  })

  try {
    const savedUser = await userModel.save()
    res.send("added: " + savedUser)
  }
  catch (err) {
    res.send(`Got error in addUser: ${err}`)
  }
}




export default controller