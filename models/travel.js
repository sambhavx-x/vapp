import mongoose from "mongoose";

const travelSchema = new mongoose.Schema({
  userid: {
    type: String,
    // required:true,
  },
  date: {
    // required:true,
    type: Date,
  },
  Destination: {
    type: Number,
  },
  fromTime: {
    type: String,
  },
  toTime: {
    type: String,
  },
});
const travel = mongoose.model("travel", travelSchema);
export default travel;
