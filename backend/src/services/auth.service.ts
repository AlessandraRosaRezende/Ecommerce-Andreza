import { IUserResponse } from "../interfaces/IUserResponse.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { UserRole } from "../interfaces/IUserRole.js";
import { IUser } from "../interfaces/IUser.js";
import { IUserLogin } from "../interfaces/IUserLogin.js";
import { IToken } from "../interfaces/IToken.js";
import { createToken } from "../middlewares/auth.middleware.js";

export async function createUser(user: IUser): Promise<IUserResponse | null> {
  try {
    const extingUser = await User.findOne({ email: user.email });
    if (extingUser) return null;
    
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const createdUser = await User.create({
      ...user,
      password: hashedPassword,
      role: user.role || "user"
    });
    console.log(createdUser);

    return {
      name: createdUser.name,
      email: createdUser.email,
      role: createdUser.role as UserRole,
      age: createdUser.age
    };
  } catch (error) {
    console.log(error);
    return null
  }
}

export async function login(user: IUserLogin): Promise<IToken | null> {
  try {
    const existingUser = await User.findOne({ email: user.email });
    if (!existingUser) return null;

    const isMatch = await bcrypt.compare(user.password, existingUser.password);
    if (!isMatch) return null;

    const token = createToken({ id: existingUser._id as unknown as string, role: existingUser.role });

    return { token };
  } catch (error) {
    console.log(error);
    return null
  }
}