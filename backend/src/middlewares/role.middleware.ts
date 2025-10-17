import { NextFunction, Request, Response } from "express";
import { UserRole } from "../interfaces/IUserRole.js";

export const authorizedRole = (role: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;

    const typedRole = userRole as UserRole;

    if (!role.includes(typedRole)) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    next();
  };
};