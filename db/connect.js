import Mongoose from "mongoose"
import config from "../config/dev.config"

Mongoose.Promise = global.Promise


const DATABASE_URL = process.env.DATABASE_URL || "mongodb+srv://snskl:qwe123@clustersnskl-k6xfk.mongodb.net/test?retryWrites=true"

const connectToDb = async () => {
  let dbHost = config.dbHost
  let dbPort = config.dbPort
  let dbName = config.dbName
  try {
    await Mongoose.connect(DATABASE_URL, { useNewUrlParser: true })
    console.log("Connected to MongoDB")
  }
  catch (err) {
    console.log("Could not connect to MongoDB")
  }
}

export default connectToDb
