import { Request, Response } from "express";
import * as userService from "../services/user.service.js";

export async function getUsersSemAge(req: Request, res: Response) {
  try {
    const users = await userService.getUsersSemAge();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" }); 
  }
}

export async function getUsers(req: Request, res: Response) {
  try {
    const users = await userService.getUsers();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" }); 
  }
}

export async function createUser(req: Request, res: Response) {
  try {
    const user = await userService.createUser(req.body);
    if (!user) {
      return res.status(400).json({ message: "User already exists" });
    }
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" }); 
  }
  
}