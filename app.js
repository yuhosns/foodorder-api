import express from "express"
import v1 from "./routes/v1"
import config from "./config/dev.config"
import connectToDb from "./db/connect"
import cors from "cors"

const app = express()
const PORT = process.env.PORT || "8080"

connectToDb()

app.use(cors())

// Set up router
app.use("/v1", v1)

// Listen and serve
app.listen(PORT, function () {
  console.log("API listening on port " + PORT + ".")
})