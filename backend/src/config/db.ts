import mongoose from "mongoose";

export const connectToDB = async () => {
     try {
          await mongoose.connect(process.env.DB_URL!);
          console.log('Database connected....')
     } catch (error: any) {
          console.error("❌ Failed to connect to database: ", error);
          process.exit(1);          
     }
}