import { QueryInterface } from "sequelize";
import bcrypt from "bcryptjs";

const userSeeder = {
  up: async (queryInterface: QueryInterface) => {
    const adminPassword = await bcrypt.hash("admin123", 10);
    const userPassword = await bcrypt.hash("user123", 10);

    return queryInterface.bulkInsert("users", [
      {
        name: "Admin User",
        email: "admin@example.com",
        password: adminPassword,
        role: "admin",
        refreshToken: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Regular User",
        email: "user@example.com",
        password: userPassword,
        role: "user",
        refreshToken: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete("users", {}, {});
  },
};

export default userSeeder;
