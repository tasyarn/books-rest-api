import Book from "../db/models/book";

export const getBooks = async () => {
  return await Book.findAll();
};

export const getBookById = async (id: string) => {
  return await Book.findByPk(id);
};

export const createBook = async (bookData: any) => {
  return await Book.create(bookData);
};

export const updateBook = async (id: string, bookData: any) => {
  const book = await Book.findByPk(id);
  if (!book) return null;
  return await book.update(bookData);
};

export const deleteBook = async (id: string) => {
  const book = await Book.findByPk(id);
  if (!book) return false;
  await book.destroy();
  return true;
};
