import Role from "../models/role.model"

export default class RoleController {
  static async onGet(req, res) {
    try {
      const response = await Role.find({}, function (err, roles) {
        let roleMap = {}

        roles.forEach(function (role) {
          roleMap[role._id] = role
        })
      })

      return res.json(response)
    } catch (err) {
      console.log(err)
      return res.json(err)
    }
  }
}