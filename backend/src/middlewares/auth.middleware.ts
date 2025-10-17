import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "../config/env.js";
import { IPayload } from "../interfaces/IPayload.js";
import { NextFunction, Request, Response } from "express";

declare module 'express-serve-static-core' {
  interface Request {
    user?: IPayload;
  }
}

export function createToken(data: IPayload): string {
  return jwt.sign({ id: data.id, role: data.role }, env.JWT_SECRET, { expiresIn: "1h" });
}

export async function verifyToken(token: string):Promise<IPayload | null> {
  if (!token) return null;

  try {
    const decoded = await jwt.verify(token, env.JWT_SECRET) as JwtPayload; 
    return { id: decoded.id, role: decoded.role } as IPayload;
  } catch (error) {
    return null
  }
}

export async function authenticate(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  const token = authorization?.split(" ")[1]; // [Bearer token]

  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }
  const payload = await verifyToken(token); 

  if (!payload) {
    return res.status(401).json({ message: "Invalid token" });
  }

  req.user = payload;
  next();
}