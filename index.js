import express from "express";
import mongoose from "mongoose";
import travelRoutes from "./routes/travel.js";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const MONGO_URL =
  "mongodb+srv://Tridetech-database:Tridetech2003@travel-cluster.szb0ugo.mongodb.net/?retryWrites=true&w=majority";
mongoose.set("strictQuery", false);
mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("connected to mmongodb database "))
  .catch((e) => console.log(e));
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`server started on  port ${PORT} succesfully`);
});
app.use("/travel", travelRoutes);
