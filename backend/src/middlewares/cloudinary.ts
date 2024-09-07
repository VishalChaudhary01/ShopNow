import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';


const storage = multer.memoryStorage();

export async function imageUploadUtil(file: string) {
     cloudinary.config({ 
          cloud_name: process.env.CLOUD_NAME, 
          api_key: process.env.API_KEY, 
          api_secret: process.env.API_SECRET,
     });
     const result = await cloudinary.uploader.upload(file, {
          resource_type: "auto",
     });
     return result;
}

export const upload = multer({ storage });
