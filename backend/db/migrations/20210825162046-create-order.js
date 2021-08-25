'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      //! Used to be sellerId to be able to find the
      // Needs to be shoeId to be able to locate the shoe thats being purchase
      shoeId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        unique:true,
        references:{model:'Shoes'}
      },
      shippingOption: {
        type: Sequelize.INTEGER,
        allowNull:false,
      },
      address: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Orders');
  }
};
