var MongoClient = require("mongodb").MongoClient
var bcrypt = require("bcrypt")
var url = process.env.DATABASE_URL || "mongodb://localhost:27017/pms"

MongoClient.connect(url, async function (err, db) {
  if (err) throw err
  var dbo = db.db("pms")
  var userToAdd = {
    username: "boss",
    password: "123",
    role:     "Boss",
  }

  await bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      console.log(err)
    }

    bcrypt.hash(userToAdd.password, salt, function (err, hash) {
      if (err) {
        console.log(err)
      }

      userToAdd.password = hash
      dbo.collection("users").insertOne(userToAdd, function (err, res) {
        if (err) throw err
        console.log("1 document inserted")
      })

      const roles = [{ name: "Manager" }, { name: "Staff" }]
      dbo.collection("roles").insertMany(roles, function (err, res) {
        if (err) throw err
        console.log("roles documents inserted")
      })
      db.close()
    })
  })

})


