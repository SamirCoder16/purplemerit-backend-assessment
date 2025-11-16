import mongoose from 'mongoose';
import { ENV } from '../lib/env.js';


const MONGO_URI = ENV.MONGO_URI;
if(!MONGO_URI) {
    throw new Error("Error : MONGO_URI is not defined in environment variables");
}

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;