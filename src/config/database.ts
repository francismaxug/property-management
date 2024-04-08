import mongoose from "mongoose";
let connected = false;
const ConnectDB = async () => {
  mongoose.set("strictQuery", true)
  if (connected) {
    console.log("Already connected to MongoDB")
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    connected = true;
    console.log("Connected to MongoDB")
  } catch (error) {
    console.log("Error connecting to MongoDB", error)
  }
}
export default ConnectDB;