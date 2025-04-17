import { Request, Response } from "express";
import { getUsersList, getUser, getUserByEmail, createUser as createUserService, updateUser as updateUserService, removeUser as removeUserService } from "../services/userService";
import { findUserByToken } from "../services/authService";
import argon2 from "argon2";
import errorMessage from "../services/errorMessage";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await getUsersList();
    if (!response) {
      res.status(404).json({
        status: "error",
        message: "Error: users not found",
      });
      return;
    }
    res.status(200).json({
      status: "success",
      message: "Successfully got users list",
      data: response,
    });
  } catch (error) {
    errorMessage(error, res);
    console.error(error);
  }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const response = await getUser(Number(id));
    if (!response) {
      res.status(404).json({
        status: "error",
        message: `Error user with id: ${id} not found`,
      });
      return;
    }
    res.status(200).json({
      status: "success",
      message: `Successfully got user with id: ${id}`,
      data: response,
    });
  } catch (error) {
    errorMessage(error, res);
    console.error(error);
  }
};

export const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
  const token = req.cookies.refreshToken;
  if (!token) {
    res.status(203).json({
      status: "error",
      message: "Error: you have no authoritative information",
    });
    return;
  }
  try {
    const findedUser = await findUserByToken(token);
    if (!findedUser) {
      res.status(404).json({
        status: "error",
        message: `Error: user with auth credential: ${token} not found`,
      });
      return;
    }
    const { id, name, email, role } = findedUser;
    res.status(200).json({
      status: "success",
      message: `Successfully got current user with auth credential: ${token}`,
      data: { id, name, email, role },
    });
  } catch (error) {
    console.error(error);
    errorMessage(error, res);
  }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, confirmPassword, role } = req.body;

  // check if password is incorrect
  if (password !== confirmPassword) {
    res.status(400).json({ status: "error", message: "Incorrect Password" });
    return;
  }

  // check if email already in use
  const findedUserByEmail = await getUserByEmail(email);
  if (findedUserByEmail?.email === email) {
    res.status(400).json({
      status: "error",
      message: `Error: email: ${email} already in use`,
    });
    return;
  }

  const hashedPassword = await argon2.hash(password);
  const dataUser = { name, email, password: hashedPassword, role };

  try {
    const user = await createUserService(dataUser);
    const { id, name: userName, email: userEmail, role: userRole } = user;
    res.status(200).json({
      status: "success",
      message: "Successfully created user",
      data: { id, name: userName, email: userEmail, role: userRole },
    });
  } catch (error) {
    errorMessage(error, res);
    console.error(error);
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const findedUser = await getUser(Number(id));

  if (!findedUser) {
    res.status(404).json({
      status: "error",
      message: `Error: user with id: ${id} not found`,
    });
    return;
  }

  const { name, email, password, confirmPassword, role } = req.body;
  let hashedPassword = password ? await argon2.hash(password) : findedUser.password;

  if (password && password !== confirmPassword) {
    res.status(400).json({ status: "error", message: "Incorrect Password" });
    return;
  }

  const userData = { name, email, password: hashedPassword, role };

  try {
    const response = await updateUserService(Number(id), userData);
    if (!response) {
      res.status(404).json({
        status: "error",
        message: `Error: user with id: ${id} not found`,
      });
      return;
    }
    const { id: userId, name: userName, email: userEmail, role: userRole } = response;

    res.status(200).json({
      status: "success",
      message: `Successfully updated user with id: ${id}`,
      data: { id: userId, name: userName, email: userEmail, role: userRole },
    });

export const removeUser = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  try {
    const response = await removeUserService(Number(id));
    if (!response) {
      return res.status(404).json({
        status: "error",
        message: `Error: user with id: ${id} not found`,
      });
    }
    return res.status(200).json({
      status: "success",
      message: `Successfully removed user with id: ${id}`,
    });
  } catch (error) {
    errorMessage(error, res);
  }