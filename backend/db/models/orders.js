'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Orders.belongsTo(models.User, {foreignKey:'userId'})
    }
  };
  Orders.init({
    username: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    email: DataTypes.STRING,
    nameOnCard: DataTypes.STRING,
    cardNumber: DataTypes.STRING,
    expirationDate: DataTypes.STRING,
    cvvNumber: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    company: DataTypes.STRING,
    address: DataTypes.STRING,
    otherAddress: DataTypes.STRING,
    city: DataTypes.STRING,
    country: DataTypes.STRING,
    stateProvince: DataTypes.STRING,
    postalCode: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    shoeIds: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Orders',
  });
  return Orders;
};