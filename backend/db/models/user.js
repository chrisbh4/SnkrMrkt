'use strict'
const { Model, Validator } = require('sequelize')
const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject () {
      const { id, username, email, firstName, lastName, shoeSize } = this // context will be the User instance (shows what data will be fetched from the backend)
      return { id, username, email, firstName, lastName, shoeSize }
    }

    validatePassword (password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString())
    }

    static getCurrentUserById (id) {
      return User.scope('currentUser').findByPk(id)
    }

    static async login ({ credential, password }) {
      const { Op } = require('sequelize')
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      })
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id)
      }
    }

    static async signup ({ username, email, firstName, lastName, shoeSize, password }) {
      const hashedPassword = bcrypt.hashSync(password)
      const user = await User.create({
        username,
        email,
        firstName,
        lastName,
        shoeSize,
        hashedPassword
      })
      return await User.scope('currentUser').findByPk(user.id)
    };

    static associate (models) {
      // define association here
      User.hasMany(models.Shoe, { foreignKey: 'sellerId' })
      User.hasMany(models.Review, { foreignKey: 'userId' })
      User.hasMany(models.Orders, { foreignKey: 'buyerId' })
    }
  };
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
          isNotEmail (value) {
            if (Validator.isEmail(value)) {
              throw new Error('Cannot be an email.')
            }
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256]
        }
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: true,
        validate:{
          len: [1,30]
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
        validate:{
          len: [1,30]
        }
      },
      shoeSize: {
        type: DataTypes.STRING,
        allowNull: true
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60]
        }
      }
    },
    {
      sequelize,
      modelName: 'User',
      defaultScope: {
        attributes: {
          exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt']
        }
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ['hashedPassword'] }
        },
        loginUser: {
          attributes: {}
        }
      }
    }
  )
  return User
}
