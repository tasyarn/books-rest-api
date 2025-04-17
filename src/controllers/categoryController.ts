import { Request, Response } from "express";
import { authenticate, authorizeRole, AuthRequest } from "../middleware/authMiddleware";
import { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from "../services/categoryService";
import errorMessage from "../services/errorMessage";

// Admin: full CRUD
export const getCategoriesList = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await getCategories();
    res.status(200).json({ status: "success", message: "Categories retrieved", data: categories });
  } catch (error) {
    errorMessage(error, res);
  }
};

export const getCategory = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const category = await getCategoryById(id);
    if (!category) {
      res.status(404).json({ status: "error", message: `Category with id ${id} not found` });
      return;
    }
    res.status(200).json({ status: "success", message: "Category retrieved", data: category });
  } catch (error) {
    errorMessage(error, res);
  }
};

export const createNewCategory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const categoryData = req.body;
    const category = await createCategory(categoryData);
    res.status(201).json({ status: "success", message: "Category created", data: category });
  } catch (error) {
    errorMessage(error, res);
  }
};

export const updateExistingCategory = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const categoryData = req.body;
    const updatedCategory = await updateCategory(id, categoryData);
    if (!updatedCategory) {
      res.status(404).json({ status: "error", message: `Category with id ${id} not found` });
      return;
    }
    res.status(200).json({ status: "success", message: "Category updated", data: updatedCategory });
  } catch (error) {
    errorMessage(error, res);
  }
};

export const deleteExistingCategory = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const deleted = await deleteCategory(id);
    if (!deleted) {
      res.status(404).json({ status: "error", message: `Category with id ${id} not found` });
      return;
    }
    res.status(200).json({ status: "success", message: "Category deleted" });
  } catch (error) {
    errorMessage(error, res);
  }
};
