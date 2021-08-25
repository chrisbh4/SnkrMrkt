'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Shoes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sellerId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        // will not allow the same user to sell multiple shoes
        // unique:true,
        references:{model:"Users"}
      },
      title: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      shoeSize: {
        type: Sequelize.INTEGER,
        allowNull:false,
      },
      image: {
        type: Sequelize.TEXT,
        allowNull:true,
      },
      price: {
        type: Sequelize.DECIMAL,
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
    await queryInterface.dropTable('Shoes');
  }
};
