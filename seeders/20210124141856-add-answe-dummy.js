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
    "Answers",
    [
      {
        description: "Itu for nya tidak jalan, coba teliti lagi di kondisi untuk loopingnya",
        PostId: 1,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: "Coba kamu tambahkan titik koma (;) di setiap akhir session",
        PostId: 2,
        UserId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: "kemungkinan ada yang salah dalam menulis code, kalau berkenan boleh masuk room dan share screen",
        PostId: 3,
        UserId: 1,
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
    await queryInterface.bulkDelete("Answers", null, {});
  }
};
