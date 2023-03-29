import mongoose from "mongoose";

const matchedSchema = new mongoose.Schema({
  userid: {
    type: String,
    // required:true,
  },
  matchedid: { type: String },
  uname: {
    type: String,
  },
  Destination: {
    type: Number,
    // 0- C to A,1 -A to C,  2- C to R ,, 3 - R to C
  },
  date: {
    // required:true,
    type: Date,
  },
  fromTime: {
    type: Number,
  },
  toTime: {
    type: Number,
  },
});
const matched = mongoose.model("matched", matchedSchema);
export default matched;
