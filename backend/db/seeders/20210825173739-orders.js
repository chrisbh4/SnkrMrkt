'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    // await queryInterface.bulkInsert('Orders', [
    //   // {shoeId:1, shippingOption:2, address:"fake addy", createdAt:new Date(), updatedAt:new Date()}
    // ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('Orders', null, {});
  }
};
