import { IUserSemAge } from "../interfaces/IUser.js";
import { IUserResponse } from "../interfaces/IUserResponse.js";
import { User } from "../models/user.model.js"; // modelo User -> abstração

export async function getUsersSemAge(): Promise<IUserSemAge[] | null> {
  try {
    const users = await User.find().select("-age");
    return users as IUserSemAge[];
  } catch (error) {
    console.log(error);
    return null
  }
}

export async function getUsers(): Promise<IUserResponse[] | null> {
  try {
    const users = await User.find();
    console.log(users);
    
    const formattedUsers = users.map((user) => ({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      age: user.age
    }))
    return formattedUsers;
  } catch (error) {
    console.log(error);
    return null
  }
}

export async function getUserById(id: string): Promise<IUserResponse | null>{
  try {
    const foundUser = await User.findById(id);
    console.log(id);
    if (!foundUser) return null;

    const formattedUser = {
      id: foundUser._id,
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role,
      age: foundUser.age
    }
    return formattedUser;
  } catch (error) {
    console.log(error);
    return null
  }
}