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
   await queryInterface.bulkInsert('Users', [{
    email: "abc@mail.com",
    status: "developer",
    nickname: 'John',
    rating: 8.2,
    createdAt: new Date(),
    updatedAt: new Date()
   },
   {
    email: "xyz@mail.com",
    status: "developer",
    nickname: 'Doe',
    rating: 9.4,
    createdAt: new Date(),
    updatedAt: new Date()
   }], {} )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
