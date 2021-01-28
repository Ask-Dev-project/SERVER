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
      "Posts",
      [
        {
          question: "Permasalahan tidak muncul di console",
          description: "Saya sedang membuat arsteriks menggunakan nested looping, tetapi tidak muncul di console",
          category: "Javascript",
          UserId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: "Saya tidak tahu error nya di mana",
          description: "Saya sedang membuat program menggunakan conditional, tetapi saya tidak tahu error nya di mana",
          category: "Cpp",
          UserId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: "Tools apa saja yang digunakan untuk belajar Java?",
          description: "Suhu mohon pencerahannya, saya tidak tahu tools apa saja yang digunakan untuk belajar java",
          category: "Java",
          UserId: 5,
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
    await queryInterface.bulkDelete("Posts", null, {});
  },
};
