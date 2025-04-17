import { Request, Response } from "express";
import { authenticate, authorizeRole, AuthRequest } from "../middleware/authMiddleware";
import { getBooks, getBookById, createBook, updateBook, deleteBook } from "../services/bookService"
import errorMessage from "../services/errorMessage";

export const getBooksList = async (req: Request, res: Response): Promise<void> => {
  try {
    const books = await getBooks();
    res.status(200).json({ status: "success", message: "Books retrieved", data: books });
  } catch (error) {
    errorMessage(error, res);
  }
};

export const getBook = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const book = await getBookById(id);
    if (!book) {
      res.status(404).json({ status: "error", message: `Book with id ${id} not found` });
      return;
    }
    res.status(200).json({ status: "success", message: "Book retrieved", data: book });
  } catch (error) {
    errorMessage(error, res);
  }
};

export const createNewBook = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const bookData = req.body;
    const book = await createBook(bookData);
    res.status(201).json({ status: "success", message: "Book created", data: book });
  } catch (error) {
    errorMessage(error, res);
  }
};

export const updateExistingBook = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const bookData = req.body;
    const updatedBook = await updateBook(id, bookData);
    if (!updatedBook) {
      res.status(404).json({ status: "error", message: `Book with id ${id} not found` });
      return;
    }
    res.status(200).json({ status: "success", message: "Book updated", data: updatedBook });
  } catch (error) {
    errorMessage(error, res);
  }
};

export const deleteExistingBook = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const deleted = await deleteBook(id);
    if (!deleted) {
      res.status(404).json({ status: "error", message: `Book with id ${id} not found` });
      return;
    }
    res.status(200).json({ status: "success", message: "Book deleted" });
  } catch (error) {
    errorMessage(error, res);
  }
};
