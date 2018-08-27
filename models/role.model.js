import mongoose from "mongoose"

const SCHEMA = mongoose.Schema
const RoleSchema = new SCHEMA({
  roleName:    { type: String, required: true },
  permissions: Array, //TODO permissions schema
})

const Role = mongoose.model("Role", RoleSchema)
export default Role
