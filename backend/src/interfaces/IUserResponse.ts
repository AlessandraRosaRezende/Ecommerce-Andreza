import { UserRole } from "../interfaces/IUserRole.js";

export interface IUserResponse {
  name: string;
  email: string;
  role: UserRole;
  age: number;
}