import Mongoose from "mongoose"
Mongoose.Promise = global.Promise

const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost:27017/pms"
const connectToDb = async () => {
  try {
    await Mongoose.connect(DATABASE_URL, { useNewUrlParser: true })
    console.log("Connected to MongoDB")
  }
  catch (err) {
    console.log("Could not connect to MongoDB")
  }
}

export default connectToDb
