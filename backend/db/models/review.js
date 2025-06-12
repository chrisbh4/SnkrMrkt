'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Review.belongsTo(models.User, { foreignKey: 'userId' })
      // Optional association to local shoes (will be null for StockX shoes)
      Review.belongsTo(models.Shoe, { foreignKey: 'shoeId', allowNull: true })
    }
    
    // Helper method to determine if this is a local shoe review or StockX review
    isLocalShoeReview() {
      return this.shoeId !== null && this.shoeId !== undefined;
    }
    
    isStockXReview() {
      return this.styleID !== null && this.styleID !== undefined;
    }
    
    // Get the identifier for this review (either shoeId or styleID)
    getShoeIdentifier() {
      return this.isLocalShoeReview() ? this.shoeId : this.styleID;
    }
  };
  Review.init({
    shoeId: {
      type: DataTypes.INTEGER,
      allowNull: true // Now optional since we support StyleID reviews
    },
    styleID: {
      type: DataTypes.STRING,
      allowNull: true // For StockX API shoes
    },
    userId: DataTypes.INTEGER,
    comment: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    image: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Review',
    validate: {
      // Ensure either shoeId OR styleID is provided, but not both
      eitherShoeIdOrStyleId() {
        if ((this.shoeId && this.styleID) || (!this.shoeId && !this.styleID)) {
          throw new Error('Review must have either shoeId (for local shoes) or styleID (for StockX shoes), but not both');
        }
      }
    }
  })
  return Review
}
