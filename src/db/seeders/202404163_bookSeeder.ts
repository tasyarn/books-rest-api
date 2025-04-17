import { QueryInterface } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert("Books", [
      {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        year: 1925,
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Sapiens",
        author: "Yuval Noah Harari",
        year: 2011,
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "A Brief History of Time",
        author: "Stephen Hawking",
        year: 1988,
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete("Books", {}, {});
  },
};
