import mongoose from 'mongoose';
import config from './config.js';

const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGO_URL)
        console.log("mongodb connected successfully");
        
    } catch (error) {
        console.log("error in connecting to db ", error);
        
    }
}

export default  connectDB;