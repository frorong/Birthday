'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Members', [
      {
        id: 5,
        name: '김경수',
        birthday: '2006/04/03',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        name: '이승제',
        birthday: '2006/07/27',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        name: '박주홍',
        birthday: '2006/07/15',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
