import mongoose, { ObjectId } from "mongoose";
import bcrypt from "bcrypt";

// need to cleanup
export interface IUser {
     id: ObjectId;
     name: string;
     email: string;
     password: string;
     role: "user" | "admin";
}

const userSchema = new mongoose.Schema<IUser>({
     name: {
          type: String,
          require: true,
     },
     email: {
          type: String,
          require: true,
          unique: true,
     },
     password: {
          type: String,
          required: true,
     },
     role: {
          type: String,
          default: "user",
     }
})

userSchema.pre('save', async function(next) {
     const user = this;
     if (user.isModified("password")) {
       user.password = await bcrypt.hash(user.password, 10);
     }
     next();
})

export const User = mongoose.model<IUser>("User", userSchema);