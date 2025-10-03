import { Request, Response } from "express";
import * as userService from "../services/user.service.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { resolve } from "path/posix";

export async function getUsersSemAge(req: Request, res: Response) {
  try {
    const users = await userService.getUsersSemAge();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" }); 
  }
}

export async function getUsers(req: Request, res: Response) {
  const { authorization } = req.headers;
  const token = authorization?.split(" ")[1]; // [Bearer token]

  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }
  const payload = await verifyToken(token);

  const userId = payload?.id;
  const role = payload?.role;
  console.log(userId, role);

  if (payload?.role !== "admin") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const users = await userService.getUsers();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" }); 
  }
}

export async function getUserById(req: Request, res: Response) {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" }); 
  }
}