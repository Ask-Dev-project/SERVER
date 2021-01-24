"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "john.doe@mail.com",
          status: "superuser",
          nickname: "John",
          rating: 8.2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "shouw.michael@mail.com",
          status: "superuser",
          nickname: "michael",
          rating: 9.4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "tatang.sudanawan@mail.com",
          status: "user",
          nickname: "tasudan",
          rating: 9.4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "esih_sukaesih@mail.com",
          status: "user",
          nickname: "esih",
          rating: 9.4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "ujang.rambo@mail.com",
          status: "user",
          nickname: "ujang_rambo",
          rating: 9.4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
