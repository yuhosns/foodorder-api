import mongoose from "mongoose"
import bcrypt from "bcrypt"

const SALT_WORK_FACTOR = 10
const SCHEMA = mongoose.Schema
const UserSchema = new SCHEMA(
  {
    username: { type: String, unique: true, required: true, index: { unique: true } },
    password: { type: String, required: true },
    role:     String,
  },
)

UserSchema.pre("save", function (next) {
  const user = this

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) {
    return next()
  }

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) {
      return next(err)
    }

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        return next(err)
      }

      // override the cleartext password with the hashed one
      user.password = hash
      next()
    })
  })
})

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      return cb(err)
    }
    cb(null, isMatch)
  })
}

export default mongoose.model("User", UserSchema)