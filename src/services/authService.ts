import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { getUserById } from "./userService";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const JWT_EXPIRES_IN = "1h"; // token expiration time

export interface JwtPayload {
  id: number;
  email: string;
  role: string;
}

export const generateToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (error) {
    return null;
  }
};

export const setTokenCookie = (res: Response, token: string): void => {
  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 3600000, // 1 hour in ms
  });
};

export const clearTokenCookie = (res: Response): void => {
  res.clearCookie("accessToken");
};

export const findUserByToken = async (token: string) => {
  const payload = verifyToken(token);
  if (!payload) return null;
  const user = await getUserById(payload.id);
  return user;
};
