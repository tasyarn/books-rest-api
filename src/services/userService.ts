import User from "../db/models/user";

export const getUsersList = async () => {
  return await User.findAll();
};

export const getUserById = async (id: number) => {
  return await User.findByPk(id);
};

export const getUser = getUserById;

export const getUserByEmail = async (email: string) => {
  return await User.findOne({ where: { email } });
};

export const createUser = async (data: any) => {
  return await User.create(data);
};

export const updateUser = async (id: number, data: any) => {
  const user = await User.findByPk(id);
  if (!user) return null;
  await user.update(data);
  return user;
};

export const removeUser = async (id: number) => {
  const user = await User.findByPk(id);
  if (!user) return null;
  await user.destroy();
  return user;
};
