import { log } from "console";
import mongoose from "mongoose";

const connectDB = async () => {
    try {
       const connectionInstsnce = await mongoose.connect
       (`${process.env.MONGODB_URI}`)
       console.log(`\n mongoDB connected !!!`);
    } catch (error) {
       console.log("mongoDB connection failed", error);
       process.exit(1) 
    }
}

export default connectDB;
