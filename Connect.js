import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const url = process.env.MONGOURL;

export async function connectDb() {
    mongoose.connect(url);
    mongoose.connection.once('open', () => {
        console.error('Connected to mongodb');
    });
    mongoose.connection.on('error', (error) => {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    });
}