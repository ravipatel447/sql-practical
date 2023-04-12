"use strict";

const { where } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const roles = await queryInterface.bulkInsert("Roles", [
      {
        role_name: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        role_name: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        role_name: "seller",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const permissions = await queryInterface.bulkInsert("Permissions", [
      {
        permission_name: "USER",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permission_name: "ORDER",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permission_name: "PRODUCT",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.dropTable("Roles");
    await queryInterface.dropTable("Permissions");
  },
};
