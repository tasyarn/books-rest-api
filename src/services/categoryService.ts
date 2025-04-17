import Category from "../db/models/category";

export const getCategories = async () => {
  return await Category.findAll();
};

export const getCategoryById = async (id: string) => {
  return await Category.findByPk(id);
};

export const createCategory = async (categoryData: any) => {
  return await Category.create(categoryData);
};

export const updateCategory = async (id: string, categoryData: any) => {
  const category = await Category.findByPk(id);
  if (!category) return null;
  return await category.update(categoryData);
};

export const deleteCategory = async (id: string) => {
  const category = await Category.findByPk(id);
  if (!category) return false;
  await category.destroy();
  return true;
};
