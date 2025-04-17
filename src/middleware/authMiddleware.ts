import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../services/authService";

export interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
    role: string;
  };
}

import { RequestHandler } from "express";

export const authenticate: RequestHandler = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.cookies.accessToken;
  
  if (!token) {
    res.status(401).json({ status: "Error", message: "Authentication token missing" });
    return;
  }
  
  const payload = verifyToken(token);
  if (!payload) {
    res.status(401).json({ status: "False", message: "Invalid or expired token" });
    return;
  }
  
  req.user = payload;
  next();
};

export const authorizeRole = (roles: string[]): RequestHandler => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ status: "False", message: "Hanya role admin yang dapat mengakses" });
      return;
    }
    next();
  };
};
