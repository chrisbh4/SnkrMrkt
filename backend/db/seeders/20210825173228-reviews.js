'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert('Reviews', [
      {shoeId:1, userId:1, comment:'test reviews',rating:4, image:null,createdAt:new Date(), updatedAt:new Date()},
      {shoeId:1, userId:2, comment:'test reviews',rating:4, image:null,createdAt:new Date(), updatedAt:new Date()},
      {shoeId:1, userId:3, comment:'test review 2',rating:4, image:null,createdAt:new Date(), updatedAt:new Date()},
      {shoeId:1, userId:3, comment:'test review 2',rating:4, image:null,createdAt:new Date(), updatedAt:new Date()},
      {shoeId:1, userId:3, comment:'test reviews 3',rating:4, image:null,createdAt:new Date(), updatedAt:new Date()},
      {shoeId:1, userId:1, comment:'test reviews 3',rating:4, image:null,createdAt:new Date(), updatedAt:new Date()},
      {shoeId:1, userId:1, comment:'test reviews',rating:4, image:null,createdAt:new Date(), updatedAt:new Date()},
      {shoeId:1, userId:1, comment:'test reviews',rating:4, image:null,createdAt:new Date(), updatedAt:new Date()},
      {shoeId:2, userId:1, comment:'test review 2',rating:4, image:null,createdAt:new Date(), updatedAt:new Date()},
      {shoeId:2, userId:1, comment:'test reviews 3',rating:4, image:null,createdAt:new Date(), updatedAt:new Date()},
      {shoeId:2, userId:1, comment:'test reviews',rating:4, image:null,createdAt:new Date(), updatedAt:new Date()},
      {shoeId:2, userId:1, comment:'test review 2',rating:4, image:null,createdAt:new Date(), updatedAt:new Date()},
      {shoeId:2, userId:1, comment:'test reviews 3',rating:4, image:null,createdAt:new Date(), updatedAt:new Date()},
      {shoeId:2, userId:1, comment:'test reviews',rating:4, image:null,createdAt:new Date(), updatedAt:new Date()},
      {shoeId:2, userId:1, comment:'test review 2',rating:4, image:null,createdAt:new Date(), updatedAt:new Date()},
      {shoeId:3, userId:1, comment:'test reviews 3',rating:4, image:null,createdAt:new Date(), updatedAt:new Date()},
      {shoeId:3, userId:1, comment:'test reviews',rating:4, image:null,createdAt:new Date(), updatedAt:new Date()},
      {shoeId:3, userId:1, comment:'test review 2',rating:4, image:null,createdAt:new Date(), updatedAt:new Date()},
      {shoeId:3, userId:1, comment:'test reviews 3',rating:4, image:null,createdAt:new Date(), updatedAt:new Date()},
      {shoeId:3, userId:1, comment:'test reviews',rating:4, image:null,createdAt:new Date(), updatedAt:new Date()},
      {shoeId:3, userId:1, comment:'test reviews',rating:4, image:null,createdAt:new Date(), updatedAt:new Date()},
      {shoeId:3, userId:1, comment:'test reviews',rating:4, image:null,createdAt:new Date(), updatedAt:new Date()},
      {shoeId:3, userId:1, comment:'test reviews',rating:4, image:null,createdAt:new Date(), updatedAt:new Date()},
      {shoeId:4, userId:1, comment:'test review 2',rating:4, image:null,createdAt:new Date(), updatedAt:new Date()},
      {shoeId:4, userId:1, comment:'test review 2',rating:4, image:null,createdAt:new Date(), updatedAt:new Date()},
      {shoeId:4, userId:1, comment:'test review 2',rating:4, image:null,createdAt:new Date(), updatedAt:new Date()},
      {shoeId:4, userId:1, comment:'test review 2',rating:4, image:null,createdAt:new Date(), updatedAt:new Date()},
      {shoeId:4, userId:1, comment:'test reviews 3',rating:4, image:null,createdAt:new Date(), updatedAt:new Date()},
      {shoeId:4, userId:1, comment:'test reviews 3',rating:4, image:null,createdAt:new Date(), updatedAt:new Date()},
      {shoeId:4, userId:1, comment:'test reviews 3',rating:4, image:null,createdAt:new Date(), updatedAt:new Date()},
      {shoeId:4, userId:1, comment:'test reviews 3',rating:4, image:null,createdAt:new Date(), updatedAt:new Date()},
      {shoeId:5, userId:1, comment:'test reviews 3',rating:4, image:null,createdAt:new Date(), updatedAt:new Date()},
      {shoeId:5, userId:1, comment:'test reviews 3',rating:4, image:null,createdAt:new Date(), updatedAt:new Date()},
      {shoeId:5, userId:1, comment:'test reviews 3',rating:4, image:null,createdAt:new Date(), updatedAt:new Date()},
      {shoeId:5, userId:1, comment:'test reviews 3',rating:4, image:null,createdAt:new Date(), updatedAt:new Date()},
      {shoeId:5, userId:1, comment:'test reviews 3',rating:4, image:null,createdAt:new Date(), updatedAt:new Date()},
      {shoeId:5, userId:1, comment:'test reviews 3',rating:4, image:null,createdAt:new Date(), updatedAt:new Date()},
      {shoeId:5, userId:1, comment:'test reviews 3',rating:4, image:null,createdAt:new Date(), updatedAt:new Date()},
      {shoeId:5, userId:1, comment:'test reviews 3',rating:4, image:null,createdAt:new Date(), updatedAt:new Date()},
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
     await queryInterface.bulkDelete('Reviews', null, {});
  }
};
