import { type Request, type Response, type NextFunction } from "express";
import { verifyToken, type JWTPayload } from "./jwt";

// add jwt user token to express request
declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  let token = authHeader && authHeader.startsWith("Bearer ")
    ? authHeader.substring(7)
    : null;

  if (!token) token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Access token required" });

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }

  req.user = decoded;
  next();
}

// if we find jwt token
// parse user from jwt token and attach it to Request
// otherwise pass
export function optionalAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  let token = authHeader && authHeader.startsWith("Bearer ")
    ? authHeader.substring(7)
    : null;

  if (!token) {
    token = req.cookies.token;
  }

  if (token) {
    const decoded = verifyToken(token);
    if (decoded) {
      req.user = decoded;
    }
  }

  next();
}
