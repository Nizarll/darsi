import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "./constants";

export interface JWTPayload {
  userId: number;
  username: string;
  role: string;
}

export function generateToken(userId: number, username: string, role: string): string {
  const payload: JWTPayload = {
    userId,
    username,
    role
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN, });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}
