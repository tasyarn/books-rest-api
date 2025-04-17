import { QueryInterface } from "sequelize";

const categorySeeder = {
  up: async (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert("Categories", [
      {
        id: 1,
        name: 'Fiction',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: 'Non-fiction',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: 'Science',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete("Categories", {}, {});
  },
};

export default categorySeeder;
