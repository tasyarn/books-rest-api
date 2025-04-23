import { Request, Response } from "express";
import { getUserByEmail, createUser as createUserService } from "../services/userService";
import { generateToken, setTokenCookie } from "../services/authService";
import argon2 from "argon2";
import { v4 as uuidv4 } from "uuid";

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      res.status(401).json({ status: "error", message: "Invalid email or password" });
      return;
    }

    const validPassword = await argon2.verify(user.password, password);
    if (!validPassword) {
      res.status(401).json({ status: "error", message: "Invalid email or password" });
      return;
    }

    const token = generateToken({ id: user.id, email: user.email, role: user.role });

    // Set the token in a cookie
    setTokenCookie(res, token);

    res.status(200).json({
      status: "success",
      message: "Login successful",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: token,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

export const signup = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, role } = req.body;

  try {
    console.log("Checking email:", email);
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      res.status(400).json({ status: "error", message: "Email already in use" });
      return;
    }

    console.log("Password to hash:", password);
    const hashedPassword = await argon2.hash(password);
    // Use provided role or default to "user"
    const userRole = role;
    const id = uuidv4();
    const newUser = await createUserService({ id, name, email, password: hashedPassword, role: userRole });

    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      data: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
