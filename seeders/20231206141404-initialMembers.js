'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Members', [
      {
        id: 0,
        name: '김경수',
        birthday: '2006/04/03',
      },
      {
        id: 1,
        name: '이승제',
        birthday: '2006/07/27',
      },
      {
        id: 2,
        name: '박주홍',
        birthday: '2006/07/15',
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
