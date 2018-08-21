import mongoose from "mongoose"

const SCHEMA = mongoose.Schema
const vendorSchema = new SCHEMA(
  {
    vendor: { type: String, required: true, index: { unique: true } },
    image:  { data: Buffer, contentType: String },
  },
)