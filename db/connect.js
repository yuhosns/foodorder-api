import Mongoose from "mongoose"
Mongoose.Promise = global.Promise

const DATABASE_URL = process.env.DATABASE_URL || "mongodb+srv://snskl:qwe123@clustersnskl-k6xfk.mongodb.net/pms?retryWrites=true"
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
