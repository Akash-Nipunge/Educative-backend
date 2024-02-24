import mongoose from "mongoose";
export default async function connectDB(){
  try {
   await mongoose.connect(process.env.MONGODB, {
    dbName:"NGO"
    });
    //console.log(`MongoDB connected with ${mongoose.connection.name}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    throw error;
  }
};
