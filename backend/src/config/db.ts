import mongoose from "mongoose";

export const connectToDB = async () => {
     try {
          await mongoose.connect(process.env.DB_URL!);
          console.log('database connected....')
     } catch (e: any) {
          console.error(e);
          process.exit(1);          
     }
}