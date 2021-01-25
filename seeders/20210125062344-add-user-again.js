'use strict';

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
        email: "jennifer@mail.com",
        status: "user",
        nickname: "Jennie",
        rating: 8.2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "robert@mail.com",
        status: "user",
        nickname: "bertrobert",
        rating: 9.4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "endang@mail.com",
        status: "user",
        nickname: "&dang",
        rating: 9.4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "asep.muthohhir@mail.com",
        status: "user",
        nickname: "mut_asep",
        rating: 9.4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "wawan.mks@mail.com",
        status: "user",
        nickname: "mks_wawan",
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
  }
};
