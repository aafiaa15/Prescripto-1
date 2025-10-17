import mongoose from 'mongoose';


const connectDB = async () => {
    try {
      

        await mongoose.connect(`${process.env.MONGODB_URI}/prescriber`)
          

        console.log("✅ Database connected successfully");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error.message);
        process.exit(1); // Exit the process if connection fails
    }
};

export default connectDB;
