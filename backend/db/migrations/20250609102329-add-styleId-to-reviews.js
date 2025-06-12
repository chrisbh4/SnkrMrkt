'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Reviews', 'styleID', {
      type: Sequelize.STRING,
      allowNull: true, // Allow null for backward compatibility with existing local shoe reviews
    });
    
    // Add index for better performance when querying by styleID
    await queryInterface.addIndex('Reviews', ['styleID']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex('Reviews', ['styleID']);
    await queryInterface.removeColumn('Reviews', 'styleID');
  }
};
