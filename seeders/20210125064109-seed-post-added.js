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
    "Posts",
    [
      {
        question: "Conditional tidak masuk",
        description: "Saya lagi belajar membuat konditional tetapi tidak masuk kondisi",
        category: "Python",
        UserId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        question: "Saya tidak tahu error nya di mana",
        description: "Saya sedang membuat program menggunakan conditional, tetapi saya tidak tahu error nya di mana",
        category: "Cs",
        UserId: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        question: "Bagaimana menemukan index dalam array?",
        description: "Saya sedang mengolah data di dalam array, tetapi saya tidak tau bagaimana cara menemukan index yang tepat",
        category: "Javascript",
        UserId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        question: "Mulai dari mana",
        description: "Saya sedang memulai belajar python, tolong arahin saya harus belajar dari mana!! ",
        category: "Python",
        UserId: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        question: "Apa yang harus dipersiapkan saat akan develop menggunakan bahasa C#",
        description: "Apa saja tools yang harus digunakan? Tolong saya suhu",
        category: "Cs",
        UserId: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        question: "Looping Infinite",
        description: "Suhu tolong dong dari tadi saya infinite looping terus",
        category: "Python",
        UserId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        question: "Bagaimana cara menemukan key tertentu?",
        description: "Saya sedang mengolah data di dalam objek, tetapi saya tidak tau bagaimana cara menemukan key yang tepat",
        category: "Javascript",
        UserId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        question: "Syntax untuk looping",
        description: "Bagaimana cara looping menggunakan for, while, dan do while di C#?",
        category: "Cs",
        UserId: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        question: "Bagaimana cara membuat conditional di C++",
        description: "Suhu tolong bantu saya, saya tidak bisa membuat conditional di C++",
        category: "Cpp",
        UserId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        question: "Mengapa codingan saya tidak jalan di terminal?",
        description: "Codingan saya tidak jalan di terminal, ada notifikasi windows kayak gitu",
        category: "Cpp",
        UserId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        question: "Mengapa program Hello World saya tidak muncul",
        description: "Saya sedang memulai belajar bahasa java, tapi program Hello World saya tidak muncul",
        category: "Java",
        UserId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        question: "bagaimana logic buble sort di Java?",
        description: "Suhu tolong bantu saya, saya tidak tau cara men sorting di Java",
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
  }
};
