import mongoose from "mongoose";
import { IUser } from "../interfaces/IUser.js";
import { PassThrough } from "stream";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  age: {
    type: Number,
    required: true,
  },
});

export const User = mongoose.model<IUser>("User", userSchema);

// BANCO DE DADOS