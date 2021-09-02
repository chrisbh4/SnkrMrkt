'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert('Shoes', [
      {sellerId:1, title:'test1', shoeSize:3, image:null ,price:33.30, createdAt: new Date(), updatedAt:new Date()},
      {sellerId:1, title:'test2', shoeSize:3, image:null ,price:33.30, createdAt: new Date(), updatedAt:new Date()},
      {sellerId:1, title:'test3', shoeSize:3, image:null ,price:44.41, createdAt: new Date(), updatedAt:new Date()},
      {sellerId:1, title:'test4', shoeSize:3, image:null ,price:44.41, createdAt: new Date(), updatedAt:new Date()},
      {sellerId:1, title:'test5', shoeSize:3, image:null ,price:44.41, createdAt: new Date(), updatedAt:new Date()},
      {sellerId:1, title:'test6', shoeSize:3, image:null ,price:44.41, createdAt: new Date(), updatedAt:new Date()},
      {sellerId:1, title:'test8', shoeSize:3, image:null ,price:44.41, createdAt: new Date(), updatedAt:new Date()},
      {sellerId:1, title:'test9', shoeSize:3, image:null ,price:44.41, createdAt: new Date(), updatedAt:new Date()},
      {sellerId:1, title:'test10', shoeSize:3, image:null ,price:44.41, createdAt: new Date(), updatedAt:new Date()},
      {sellerId:2, title:'test-0', shoeSize:3, image:null ,price:450.00, createdAt: new Date(), updatedAt:new Date()},
      {sellerId:2, title:'test-0', shoeSize:3, image:null ,price:450.00, createdAt: new Date(), updatedAt:new Date()},
      {sellerId:2, title:'test-0', shoeSize:3, image:null ,price:450.00, createdAt: new Date(), updatedAt:new Date()},
      {sellerId:2, title:'test-0', shoeSize:3, image:null ,price:450.00, createdAt: new Date(), updatedAt:new Date()},
      {sellerId:2, title:'test-0', shoeSize:3, image:null ,price:450.00, createdAt: new Date(), updatedAt:new Date()},
      {sellerId:1, title:'test-0', shoeSize:3, image:null ,price:450.00, createdAt: new Date(), updatedAt:new Date()},
      {sellerId:2, title:'test-0', shoeSize:3, image:null ,price:450.00, createdAt: new Date(), updatedAt:new Date()}
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('Shoes', null, {});
  }
};
